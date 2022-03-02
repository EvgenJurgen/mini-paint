import { combineReducers } from 'redux';
import imageReducer from './imageReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  images: imageReducer,
});

export type State = ReturnType<typeof rootReducer>;
