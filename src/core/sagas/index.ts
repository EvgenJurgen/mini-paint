import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { imagesSaga } from './imagesSaga/index';
import { userSaga } from './userSaga/index';

export function* rootSaga(): Generator<
  AllEffect<Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown>>,
  void,
  unknown
> {
  yield all([userSaga(), imagesSaga()]);
}
