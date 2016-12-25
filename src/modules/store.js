import 'rxjs';

const initialState = {
  loading: false,
  ids: [],
};

export function reducer(state = initialState, action) {
  return state;
}

export const watchEpic = (action$) => {
  console.log(action$);
  return action$.ofType('story/watch')
    .mapTo(() => {})
}

export function selectList() {
}
