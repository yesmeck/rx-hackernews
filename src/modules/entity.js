import merge from 'lodash/fp/merge';

const initialState = {
  story: {
    top: {},
    new: {},
    show: {},
    ask: {},
    job: {},
  },
  user: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'entity/set':
      return merge(state, payload.entities)
    default:
      return state;
  }
}
