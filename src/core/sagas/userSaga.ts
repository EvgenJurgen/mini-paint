import { put, takeEvery, call } from 'redux-saga/effects';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	getUser,
	getUserFailid,
	getUserSuccess,
	loginUserFailid,
	logoutSuccess,
	registerUserFailid,
} from '../reducers/userReducer';
import { auth, firestore } from '../configs/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function writeUserData(user: any, nickname: string) {
	try {
		await setDoc(doc(firestore, 'users', user.uid), {
			nickname,
			email: user.email,
		});
	} catch {
		throw new Error('Error recording user data');
	}
}

function* registerUserWorker({ payload }: any): any {
	try {
		const user = yield call(() =>
			createUserWithEmailAndPassword(auth, payload.email, payload.password)
		);
		yield call(() => writeUserData(user.user, payload.nickname));
		yield put(getUser());
	} catch (error: any) {
		yield put(registerUserFailid({ error: error.message }));
	}
}

function* loginUserWorker({ payload }: any): any {
	try {
		yield call(() => signInWithEmailAndPassword(auth, payload.email, payload.password));
		yield put(getUser());
	} catch (error: any) {
		yield put(loginUserFailid({ error: error.message }));
	}
}

async function readUserData(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			throw Error('Error receiving user data');
		}
	} catch {
		throw new Error('Error reading user data');
	}
}

async function onAuthStateChangedUser() {
	return await new Promise((resolve, reject) => {
		onAuthStateChanged(auth, (user: any) => {
			resolve(user);
		});
	});
}

function* getCurrentUserWorker(): any {
	try {
		const currentUser = yield call(() => onAuthStateChangedUser());
		const userData = yield call(() => readUserData(currentUser.uid));
		yield call(() => {
			currentUser.nickname = userData.nickname;
		});
		yield put(getUserSuccess(currentUser));
	} catch (e: any) {
		switch(e.message){
			case 'Error reading user data':
				yield put(getUserFailid({ error: e.message }));
				break;
			default:
				yield put(getUserFailid({ error: '' }));
		}
	}
}

function* logoutWorker(): any {
	try {
		yield call(() => signOut(auth));
		yield put(logoutSuccess());
	} catch (e: any) {
		console.log({ error: e.message });
	}
}

export function* userSaga() {
	yield takeEvery('user/loginUser', loginUserWorker);
	yield takeEvery('user/registerUser', registerUserWorker);
	yield takeEvery('user/getUser', getCurrentUserWorker);
	yield takeEvery('user/logout', logoutWorker);
}
