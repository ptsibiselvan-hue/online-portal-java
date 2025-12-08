import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import quizReducer from './reducers/quizReducer';

const reducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  quizzes: quizReducer,
});

const middleware = [thunk];

// Try to use Redux DevTools if available, otherwise just use middleware
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  ((config) => config);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

