import {
	deleteObject,
	getDownloadURL,
	listAll,
	ref,
	StorageReference,
	uploadString,
} from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';
import { firestore, storage } from '../configs/firebase.config';
import {
	deleteImageByUrlFailid,
	deleteImageByUrlSuccess,
	getImagesOfAllUsersFailid,
	getImagesOfAllUsersSuccess,
	getImagesOfCurrentUserFailid,
	getImagesOfCurrentUserSuccess,
	ImagesLinksWithDataOfUsers,
	saveImageOfUserFailid,
	saveImageOfUserSuccess,
} from '../reducers/imagesReducer';

async function getImagesUrls(imagesRefs: StorageReference[]) {
	return await Promise.all(
		imagesRefs.map(async (imageRef) => {
			const url = await getDownloadURL(imageRef);
			return url;
		})
	);
}

function* getImagesOfCurrentUserWorker({ payload }: any) {
	try {
		const imagesRefs: StorageReference[] = yield call(async () => {
			const imageRefs = await listAll(ref(storage, `images/${payload.uid}`));
			return imageRefs.items;
		});

		const imagesOfCurrentUser: string[] = yield call(() => getImagesUrls(imagesRefs));

		yield put(getImagesOfCurrentUserSuccess({ imagesOfCurrentUser }));
	} catch (e: any) {
		yield put(getImagesOfCurrentUserFailid({ error: e.message }));
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

		const imagesOfAllUsers: ImagesLinksWithDataOfUsers = yield call(() =>
			getAllImages(arrayOfImagesRefsOfAllUsers)
		);

		yield put(getImagesOfAllUsersSuccess({ imagesOfAllUsers }));
	} catch (e: any) {
		yield put(getImagesOfAllUsersFailid({ error: e.message }));
	}
}

function* saveImageOfUserWorker({ payload }: any) {
	try {
		const storageRef: StorageReference = yield call(() =>
			ref(storage, `images/${payload.uid}/${Date.now()}`)
		);
		yield uploadString(storageRef, payload.dataURL, 'data_url');
		yield put(saveImageOfUserSuccess());
	} catch (e: any) {
		yield put(saveImageOfUserFailid({ error: e.message }));
	}
}

function* deleteImageByUrlWorker({ payload }: any) {
	try {
		const imageRef: StorageReference = yield ref(storage, payload.url);
		yield deleteObject(imageRef);
		yield put(deleteImageByUrlSuccess(payload));
	} catch (e: any) {
		yield put(deleteImageByUrlFailid({ error: e.message }));
	}
}

export function* imagesSaga() {
	yield takeEvery('images/getImagesOfCurrentUser', getImagesOfCurrentUserWorker);
	yield takeEvery('images/getImagesOfAllUsers', getImagesOfAllUsersWorker);
	yield takeEvery('images/saveImageOfUser', saveImageOfUserWorker);
	yield takeEvery('images/deleteImageByUrl', deleteImageByUrlWorker);
}
