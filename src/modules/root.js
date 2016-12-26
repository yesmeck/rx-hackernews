import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as entity from './entity';
import * as story from './story';
import user from './user';

export const reducer = combineReducers({
  entity: entity.reducer,
  story: story.reducer,
  user,
});

export const epic = combineEpics(
  story.epic,
);
