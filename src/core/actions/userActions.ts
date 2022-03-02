import { RecordAnErrorPayload } from '../interfaces/payloads/RecordAnErrorPayload';
import { GetUserSuccessPayload } from '../interfaces/payloads/GetUserSuccessPayload';
import { LoginUserPayload } from '../interfaces/payloads/LoginUserPayload';
import { RegisterUserPayload } from '../interfaces/payloads/RegisterUserPayload';
import { RegisterUserAction } from '../interfaces/actions/userActions/RegisterUserAction';
import { LoginUserAction } from '../interfaces/actions/userActions/LoginUserAction';
import { GetUserAction } from '../interfaces/actions/userActions/GetUserAction';
import { GetUserSuccessAction } from '../interfaces/actions/userActions/GetUserSuccessAction';
import { LogoutAction } from '../interfaces/actions/userActions/LogoutAction';
import { LogoutSuccessAction } from '../interfaces/actions/userActions/LogoutSuccessAction';
import { RecordAnUserErrorAction } from '../interfaces/actions/userActions/RecordAnUserErrorAction';
import { RemoveUserErrorAction } from '../interfaces/actions/userActions/RemoveUserErrorAction';

export enum UserActionTypes {
  REGISTER_USER = 'user/registerUser',
  LOGIN_USER = 'user/loginUser',
  GET_USER = 'user/getUser',
  GET_USER_SUCCESS = 'user/getUserSuccess',
  LOGOUT = 'user/logout',
  LOGOUT_SUCCESS = 'user/logoutSuccess',
  RECORD_AN_USER_ERROR = 'user/recordAnUserError',
  REMOVE_USER_ERROR = 'user/removeUserError',
}

export const registerUser = (payload: RegisterUserPayload): RegisterUserAction => ({
  type: UserActionTypes.REGISTER_USER,
  payload,
});

export const loginUser = (payload: LoginUserPayload): LoginUserAction => ({
  type: UserActionTypes.LOGIN_USER,
  payload,
});

export const getUser = (): GetUserAction => ({ type: UserActionTypes.GET_USER });

export const getUserSuccess = (payload: GetUserSuccessPayload): GetUserSuccessAction => ({
  type: UserActionTypes.GET_USER_SUCCESS,
  payload,
});

export const logout = (): LogoutAction => ({ type: UserActionTypes.LOGOUT });

export const logoutSuccess = (): LogoutSuccessAction => ({ type: UserActionTypes.LOGOUT_SUCCESS });

export const recordAnUserError = (payload: RecordAnErrorPayload): RecordAnUserErrorAction => ({
  type: UserActionTypes.RECORD_AN_USER_ERROR,
  payload,
});

export const removeUserError = (): RemoveUserErrorAction => ({
  type: UserActionTypes.REMOVE_USER_ERROR,
});
