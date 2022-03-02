import { UserActionTypes } from '../../../actions/userActions';
import { RegisterUserPayload } from '../../payloads/RegisterUserPayload';

export interface RegisterUserAction {
  type: UserActionTypes.REGISTER_USER;
  payload: RegisterUserPayload;
}
