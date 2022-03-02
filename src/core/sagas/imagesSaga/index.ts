import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import {
  deleteImageByUrlWatcher,
  getImagesOfAllUsersWatcher,
  getImagesOfCurrentUserWatcher,
  saveImageOfUserWatcher,
} from './imagesSaga';

export function* imagesSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
  yield all([
    getImagesOfCurrentUserWatcher(),
    getImagesOfAllUsersWatcher(),
    saveImageOfUserWatcher(),
    deleteImageByUrlWatcher(),
  ]);
}
