import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import {
  getCurrentUserWatcher,
  loginUserWatcher,
  logoutWatcher,
  registerUserWatcher,
} from './userSaga';

export function* userSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([loginUserWatcher(), registerUserWatcher(), getCurrentUserWatcher(), logoutWatcher()]);
}
