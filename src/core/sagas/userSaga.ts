import {put, takeEvery, call} from 'redux-saga/effects'
import { useAddDoc, useLogIn, useSignUp } from '../hooks/firebase'
import { loginUserFailid, loginUserSuccess, registerUserFailid, registerUserSuccess } from '../reducers/userReducer'

function* addNicknameToUser(registeredUser:any):any{
    yield call(()=>useAddDoc('users',{nickname:registeredUser.payload.nickname, uid:registeredUser.payload.uid}))
}

function* registerUserWorker(registeredUser:any):any{
    try{
    const createdUser = yield call(()=>useSignUp(registeredUser.payload.email, registeredUser.payload.password))
    const newUser = yield {email:createdUser.user.email, uid:createdUser.user.uid}
    console.log(newUser)
    // yield call(()=>addNicknameToUser(registerUserSuccess))
    // newUser.nickname = registeredUser.payload.nickname
    yield put(registerUserSuccess(newUser))
    } catch (error:any){
        yield put(registerUserFailid({error:error.message}))
    }
}

function* loginUserWorker(candidate:any):any{
    try{
    const authorizedUser = yield call(()=>useLogIn(candidate.payload.email, candidate.payload.password))
    console.log('test data', authorizedUser)
    yield put(loginUserSuccess(authorizedUser.user))
    } catch(error:any){
        yield put(loginUserFailid({error:error.message}))
    }
}



export function* userSaga(){
    yield takeEvery('user/loginUser', loginUserWorker)
    yield takeEvery('user/registerUser', registerUserWorker)
}
