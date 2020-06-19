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

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<Event> eventsList = new LinkedList<>();
    List<Event> eventsListOptional = new LinkedList<>();
    for (Event event : events) {
      // add event to list if event and request have attendees in common
      if (!Collections.disjoint(event.getAttendees(), request.getAttendees())) {
        eventsList.add(event);
        eventsListOptional.add(event);
        // account for optional attendees
      } else if (!Collections.disjoint(event.getAttendees(), request.getOptionalAttendees())) {
        eventsListOptional.add(event);
      }
    }
    Collection<TimeRange> freeSlots = getFreeSlots(eventsListOptional);
    Predicate<TimeRange> notEnoughTime = (TimeRange x) -> x.duration() < request.getDuration();
    freeSlots.removeIf(notEnoughTime);

    // check for mandatory attendees if no times for optional
    if (freeSlots.isEmpty() && !request.getAttendees().isEmpty()) {
      freeSlots = getFreeSlots(eventsList);
      freeSlots.removeIf(notEnoughTime);
    }
    return freeSlots;
  }

  private Collection<TimeRange> getFreeSlots(List<Event> eventsList) {
    Collections.sort(eventsList, new Comparator<Event>() {
      public int compare(Event event1, Event event2) {
        return event1.getWhen().start() - event2.getWhen().start();
      }
    });
    int start = TimeRange.START_OF_DAY;
    int i = 0;
    Collection<TimeRange> freeSlots = new LinkedList<>();

    // check for conflicting events
    while (i < eventsList.size()) {
      int end = eventsList.get(i).getWhen().start();
      freeSlots.add(TimeRange.fromStartEnd(start, end, false));
      start = eventsList.get(i).getWhen().end();

      while (i < eventsList.size() - 1 && (eventsList.get(i + 1).getWhen().start() < start)) {
        i++;
        start = Math.max(start, eventsList.get(i).getWhen().end());
      }
      i++;
    }
    freeSlots.add(TimeRange.fromStartEnd(start, TimeRange.END_OF_DAY, true));
    return freeSlots;
  }
}