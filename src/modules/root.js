import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as entity from './entity';
import * as story from './story';
import * as user from './user';

export const reducer = combineReducers({
  entity: entity.reducer,
  story: combineReducers({
    top: story.createReducer('top'),
    new: story.createReducer('new'),
    show: story.createReducer('show'),
    ask: story.createReducer('ask'),
    job: story.createReducer('job'),
  }),
  user: user.reducer,
});

export const epic = combineEpics(
  story.createEpic('top'),
  story.createEpic('new'),
  story.createEpic('show'),
  story.createEpic('ask'),
  story.createEpic('job'),
  user.epic,
);
