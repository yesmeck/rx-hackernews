import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { normalize } from 'normalizr';
import { combineEpics } from 'redux-observable';
import { createSelector } from 'reselect';
import Schemas from '../config/schemas';
import { watchIdsByType, fetchItems, fetchItem } from '../services/db';

const PER_PAGE = 20;

const initialState = {
  loading: false,
  ids: [],
};

export const reducer = (state = initialState, { type, payload}) => {
  switch (type) {
    case 'story/watch':
      return {
        ...state,
        loading: true,
      };
    case 'story/setIds':
      return {
        ...state,
        loading: false,
        ids: payload,
      };
    default:
      return state;
  }
  return state;
}

const watchEpic = (action$) =>
  action$
    .ofType('story/watch')
    .mergeMap(() =>
      Observable.bindCallback(watchIdsByType)('top')
      .takeUntil(action$.ofType('story/cancelWatch'))
    )
    .mergeMap(ids => Observable.from(fetchItems(ids)))
    .map(stories => normalize(stories, Schemas.STORY_ARRAY))
    .mergeMap(normalized =>
      Observable.concat(
        Observable.of({ type: 'entity/set', payload: normalized }),
        Observable.of({ type: 'story/setIds', payload: normalized.result }),
      )
    );

export const epic = combineEpics(
  watchEpic,
)

export const selectList = createSelector(
  state => state.entity.story,
  (state, page = 1) => {
    const start = (page - 1) * PER_PAGE
    const end = page * PER_PAGE
    return state.story.ids.slice(start, end)
  },
  (stories, ids) => ids.map(id => stories[id])
);
