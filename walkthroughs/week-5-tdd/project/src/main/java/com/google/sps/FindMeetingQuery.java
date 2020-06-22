// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<Event> eventsListMandatory = new ArrayList<>();
    ArrayList<Event> eventsListOptional = new ArrayList<>();
    for (Event event : events) {
      // add event to list if event and request have attendees in common and account for mandatory attendees 
      if (!Collections.disjoint(event.getAttendees(), request.getAttendees())) {
        eventsListMandatory.add(event);
        eventsListOptional.add(event);
        // account for optional attendees
      } else if (!Collections.disjoint(event.getAttendees(), request.getOptionalAttendees())) {
        eventsListOptional.add(event);
      }
    }
    //get availability for optional attendees
    Collection<TimeRange> freeSlots = getFreeSlots(eventsListOptional);

    //remove TimeRange if there's not enough time between the last meeting and the end of day 
    Predicate<TimeRange> notEnoughTimePredicate = (TimeRange tr) -> tr.duration() < request.getDuration();
    freeSlots.removeIf(notEnoughTimePredicate);

    // check for mandatory attendees if no times for optional
    if (freeSlots.isEmpty() && !request.getAttendees().isEmpty()) {
      freeSlots = getFreeSlots(eventsListMandatory);
      freeSlots.removeIf(notEnoughTimePredicate);
    }
    return freeSlots;
  }

  private Collection<TimeRange> getFreeSlots(List<Event> eventsList) {
    Collections.sort(eventsList, new Comparator<Event>() {
      public int compare(Event event1, Event event2) {
        return event1.getWhen().start() - event2.getWhen().start();
      }
    });

    //set start of events to be the start of day as default 
    int startOfEvents = TimeRange.START_OF_DAY;
    int i = 0;
    Collection<TimeRange> freeSlots = new ArrayList<>();

    // check for conflicting events
    while (i < eventsList.size()) {
      int endOfEvents = eventsList.get(i).getWhen().start();
      //prevent adding a time range of no time 
      if (startOfEvents != endOfEvents) {
        freeSlots.add(TimeRange.fromStartEnd(startOfEvents, endOfEvents, false));
      }      
      startOfEvents = eventsList.get(i).getWhen().end();

      //continue to loop through events and break out before going out of bounds
      while (i < eventsList.size() - 1 && (eventsList.get(i + 1).getWhen().start() < startOfEvents)) {
        i++;
        //update start of events to be the later of either the start of events or the start of the next event  
        startOfEvents = Math.max(startOfEvents, eventsList.get(i).getWhen().end());
      }
      i++;
    }
    freeSlots.add(TimeRange.fromStartEnd(startOfEvents, TimeRange.END_OF_DAY, true));
    return freeSlots;
  }
}