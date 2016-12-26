import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { normalize } from 'normalizr';
import { combineEpics } from 'redux-observable';
import { createSelector } from 'reselect';
import Schemas from '../config/schemas';
import { watchIdsByType, fetchItems, fetchItem } from '../services/db';
import { PAGE_SIZE } from '../config/constants';

const initialState = {
  loading: false,
  ids: [],
};

export const createReducer = type =>
  (state = initialState, { type: actionType, payload}) => {
    switch (actionType) {
      case `story/${type}/watch`:
        return {
          ...state,
          loading: true,
        };
      case `story/${type}/setIds`:
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

const watchEpic = type => action$ =>
  action$
    .ofType(`story/${type}/watch`)
    .mergeMap(() =>
      Observable.bindCallback(watchIdsByType)(type)
      .takeUntil(action$.ofType(`story/${type}/cancelWatch`))
    )
    .mergeMap(ids => Observable.from(fetchItems(ids)))
    .map(stories => normalize(stories, Schemas.STORY_ARRAY))
    .mergeMap(normalized =>
      Observable.concat(
        Observable.of({
          type: 'entity/set',
          payload: normalized
        }),
        Observable.of({
          type: `story/${type}/setIds`,
          payload: normalized.result
        }),
      )
    );

const fetchOne = type => action$ =>
  action$
    .ofType(`story/${type}/fetchOne`)
    .mergeMap(({ payload }) => Observable.from(fetchItem(payload)))
    .map(story => normalize(story, Schemas.STORY))
    .map(normalized => ({ type: 'entity/set', payload: normalized }))

export const createEpic = type => combineEpics(
  watchEpic(type),
  fetchOne(type),
)

export const selectList = createSelector(
  state => state.entity.story,
  (state, type, page = 1) => {
    const start = (page - 1) * PAGE_SIZE
    const end = page * PAGE_SIZE
    return state.story[type].ids.slice(start, end)
  },
  (stories, ids) => ids.map(id => stories[id])
);
