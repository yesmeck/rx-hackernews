import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import * as Story from './containers/Story'
import * as User from './containers/User'

export default function routes() {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="top" />
      <Route path="top(/:page)" component={Story.createListPage('top')} />
      <Route path="new(/:page)" component={Story.createListPage('new')} />
      <Route path="show(/:page)" component={Story.createListPage('show')} />
      <Route path="ask(/:page)" component={Story.createListPage('ask')} />
      <Route path="job(/:page)" component={Story.createListPage('job')} />
      <Route path="items/:id" component={Story.DetailPage} />
      <Route path="users/:id" component={User.DetailPage} />
    </Route>
  );
}
