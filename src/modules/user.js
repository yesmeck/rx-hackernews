import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { normalize } from 'normalizr'
import { combineEpics } from 'redux-observable';
import Schemas from '../config/schemas'
import { fetchUser } from '../services/db'

const initialState = {};

export const reducer = (state = initialState, action) => {
  return state;
}

const fetchEpic = action$ =>
  action$
    .ofType('user/fetch')
    .mergeMap(({ payload }) => Observable.from(fetchUser(payload)))
    .map(user => normalize(user, Schemas.USER))
    .map(normalized => ({ type: 'entity/set', payload: normalized }))


export const epic = combineEpics(
  fetchEpic
);
