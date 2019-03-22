import { createStore, combineReducers,compose ,applyMiddleware } from 'redux';
import reducers from '../reducers';
import Bookings from '../reducers/Bookings/Bookings.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
        Bookings
    }),
    {},
      compose(
          applyMiddleware(thunk),
          applyMiddleware(logger),

      ),

  );
}