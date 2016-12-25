import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as store from './store';
import user from './user';

export const reducer = combineReducers({
  store: store.reducer,
  user,
});

export const epic = combineEpics(
  store.watchEpic,
);
