import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import { reducer, epic } from './modules/root';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware(epic);
  const logger = createLogger();

  return createStore(
    reducer,
    applyMiddleware(epicMiddleware, logger)
  );
}
