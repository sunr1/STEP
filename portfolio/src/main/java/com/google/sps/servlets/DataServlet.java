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

package com.google.sps.servlets;

import static java.util.stream.Collectors.toList;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/comments")
public class DataServlet extends HttpServlet {
  private static final String NAME = "name";
  private static final String TEXT = "text";
  private static final String TIMESTAMP = "timestamp";
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort(TIMESTAMP, SortDirection.ASCENDING);
    PreparedQuery results = datastore.prepare(query);

    int numLimit = Integer.parseInt(request.getParameter("comment-limit"));
    List<Entity> commentsEntity = results.asList(FetchOptions.Builder.withLimit(numLimit));

    List<Comment> comments =
        commentsEntity.stream()
            .map(entity
                -> new Comment((long) entity.getKey().getId(), (String) entity.getProperty(NAME),
                    (String) entity.getProperty(TEXT), (String) entity.getProperty(TIMESTAMP)))
            .collect(toList());

    response.setContentType("application/json;");
    String json = new Gson().toJson(comments);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty(NAME, request.getParameter("name-input"));
    commentEntity.setProperty(TEXT, request.getParameter("text-input"));

    SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss MM/dd/yyyy");
    commentEntity.setProperty(TIMESTAMP, dateFormat.format(new Date()));

    datastore.put(commentEntity);

    response.sendRedirect("/index.html");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    return value == null ? defaultValue : value;
  }
}