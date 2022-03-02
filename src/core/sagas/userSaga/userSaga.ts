import { put, takeEvery, call, ForkEffect } from 'redux-saga/effects';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {
  getUser,
  getUserSuccess,
  logoutSuccess,
  recordAnUserError,
  UserActionTypes,
} from '../../actions/userActions';
import { auth, firestore } from '../../configs/firebase.config';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { RegisterUserAction } from '../../interfaces/actions/userActions/RegisterUserAction';
import { LoginUserAction } from '../../interfaces/actions/userActions/LoginUserAction';
import { GetUserSuccessPayload } from '../../interfaces/payloads/GetUserSuccessPayload';

async function isNicknameBusy(nickname: string) {
  try {
    const q = query(collection(firestore, 'users'), where('nickname', '==', nickname));

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch {
    throw Error('Nickname verification error');
  }
}

async function writeUserData(user: GetUserSuccessPayload) {
  try {
    await setDoc(doc(firestore, 'users', user.uid), {
      nickname: user.nickname,
      email: user.email,
    });
  } catch {
    throw new Error('Error recording user data');
  }
}

function* registerUserWorker({ payload }: RegisterUserAction) {
  try {
    const isNickBusy = yield call(() => isNicknameBusy(payload.nickname));

    if (isNickBusy) {
      throw Error('User with this nickname already exists');
    }

    const user = yield call(() =>
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
    );
    yield call(() =>
      writeUserData({ uid: user.user.uid, email: user.user.email, nickname: payload.nickname })
    );
    yield put(getUser());
  } catch ({ message }) {
    yield put(recordAnUserError(message));
  }
}

function* loginUserWorker({ payload }: LoginUserAction) {
  try {
    yield call(() => signInWithEmailAndPassword(auth, payload.email, payload.password));
    yield put(getUser());
  } catch ({ message }) {
    yield put(recordAnUserError(message));
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
  return await new Promise((resolve) => {
    onAuthStateChanged(auth, (user: User | null) => {
      resolve(user);
    });
  });
}

function* getCurrentUserWorker() {
  try {
    const currentUser = yield call(() => onAuthStateChangedUser());
    const userData = yield call(() => readUserData(currentUser.uid));
    yield call(() => {
      currentUser.nickname = userData.nickname;
    });
    yield put(getUserSuccess(currentUser));
  } catch ({ message }) {
    switch (message) {
      case 'Error reading user data':
        yield put(recordAnUserError(message));
        break;
      default:
        yield put(recordAnUserError(''));
    }
  }
}

function* logoutWorker() {
  try {
    yield call(() => signOut(auth));
    yield put(logoutSuccess());
  } catch ({ message }) {
    yield put(recordAnUserError(message));
  }
}

export function* loginUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(UserActionTypes.LOGIN_USER, loginUserWorker);
}

export function* registerUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(UserActionTypes.REGISTER_USER, registerUserWorker);
}

export function* getCurrentUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(UserActionTypes.GET_USER, getCurrentUserWorker);
}

export function* logoutWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(UserActionTypes.LOGOUT, logoutWorker);
}
