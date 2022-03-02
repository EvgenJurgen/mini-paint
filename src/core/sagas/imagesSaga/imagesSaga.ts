import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  uploadString,
} from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { firestore, storage } from '../../configs/firebase.config';
import {
  deleteImageByUrlSuccess,
  getImagesOfAllUsersSuccess,
  getImagesOfCurrentUserSuccess,
  saveImageOfUserSuccess,
  recordAnImageError,
  ImageActionTypes,
} from '../../actions/imageActions';
import { ArrayOfImages } from '../../interfaces/payloads/ArrayOfImages';
import { ArrayOfUserDataWithImages } from '../../interfaces/payloads/ArrayOfUserDataWithImages';
import { SaveImageOfUserAction } from '../../interfaces/actions/imageActions/SaveImageOfUserAction';
import { GetImagesOfCurrentUserAction } from '../../interfaces/actions/imageActions/GetImagesOfCurrentUserAction';
import { DeleteImageByUrlAction } from '../../interfaces/actions/imageActions/DeleteImageByUrlAction';

async function getImagesUrls(imagesRefs: StorageReference[]) {
  return await Promise.all(
    imagesRefs.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      return url;
    })
  );
}

function* getImagesOfCurrentUserWorker({ payload }: GetImagesOfCurrentUserAction) {
  try {
    const imagesRefs: StorageReference[] = yield call(async () => {
      const imageRefs = await listAll(ref(storage, `images/${payload.uid}`));
      return imageRefs.items;
    });

    const imagesOfCurrentUser: ArrayOfImages = yield call(() => getImagesUrls(imagesRefs));

    yield put(getImagesOfCurrentUserSuccess(imagesOfCurrentUser));
  } catch ({ message }) {
    yield put(recordAnImageError(message));
  }
}

async function getArraysOfImagesRefsOfAllUsers(directoriesRefs: StorageReference[]) {
  return await Promise.all(
    directoriesRefs.map(async (directoryRef) => {
      const imageRefs = await listAll(directoryRef);
      return { authorId: directoryRef.name, items: imageRefs.items };
    })
  );
}

interface ImagesRefsOfUser {
  authorId: string;
  items: StorageReference[];
}

type ImagesRefsOfAllUsers = Array<ImagesRefsOfUser>;

async function getAllImages(arrayOfImagesRefsOfAllUsers: ImagesRefsOfAllUsers) {
  return await Promise.all(
    arrayOfImagesRefsOfAllUsers.map(async (arrayOfImagesRefsOfUser) => {
      const urls = await getImagesUrls(arrayOfImagesRefsOfUser.items);
      const docSnap = await getDoc(doc(firestore, 'users', arrayOfImagesRefsOfUser.authorId));
      const res = { ...docSnap.data(), urls };
      return res;
    })
  );
}

function* getImagesOfAllUsersWorker() {
  try {
    const directoriesRefs: StorageReference[] = yield call(async () => {
      const directorieRefs = await listAll(ref(storage, 'images'));
      return directorieRefs.prefixes;
    });

    const arrayOfImagesRefsOfAllUsers: ImagesRefsOfAllUsers = yield call(() =>
      getArraysOfImagesRefsOfAllUsers(directoriesRefs)
    );

    const imagesOfAllUsers: ArrayOfUserDataWithImages = yield call(() =>
      getAllImages(arrayOfImagesRefsOfAllUsers)
    );

    yield put(getImagesOfAllUsersSuccess(imagesOfAllUsers));
  } catch ({ message }) {
    yield put(recordAnImageError(message));
  }
}

function* saveImageOfUserWorker({ payload }: SaveImageOfUserAction) {
  try {
    const storageRef: StorageReference = yield call(() =>
      ref(storage, `images/${payload.uid}/${Date.now()}`)
    );
    yield uploadString(storageRef, payload.imageUrl, 'data_url');
    yield put(saveImageOfUserSuccess());
  } catch ({ message }) {
    yield put(recordAnImageError(message));
  }
}

function* deleteImageByUrlWorker({ payload }: DeleteImageByUrlAction) {
  try {
    const imageRef: StorageReference = yield ref(storage, payload.url);
    yield deleteObject(imageRef);
    yield put(deleteImageByUrlSuccess(payload));
  } catch ({ message }) {
    yield put(recordAnImageError(message));
  }
}

export function* getImagesOfCurrentUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ImageActionTypes.GET_IMAGES_OF_CURRENT_USER, getImagesOfCurrentUserWorker);
}

export function* getImagesOfAllUsersWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ImageActionTypes.GET_IMAGES_OF_ALL_USERS, getImagesOfAllUsersWorker);
}

export function* saveImageOfUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ImageActionTypes.SAVE_IMAGE_OF_USER, saveImageOfUserWorker);
}

export function* deleteImageByUrlWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ImageActionTypes.DELETE_IMAGE_BY_URL, deleteImageByUrlWorker);
}
