import { UserActionTypes } from '../../../actions/userActions';
import { LoginUserPayload } from '../../payloads/LoginUserPayload';

export interface LoginUserAction {
  type: UserActionTypes.LOGIN_USER;
  payload: LoginUserPayload;
}
