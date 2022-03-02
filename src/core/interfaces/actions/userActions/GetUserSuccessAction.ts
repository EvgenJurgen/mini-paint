import { UserActionTypes } from '../../../actions/userActions';
import { GetUserSuccessPayload } from '../../payloads/GetUserSuccessPayload';

export interface GetUserSuccessAction {
  type: UserActionTypes.GET_USER_SUCCESS;
  payload: GetUserSuccessPayload;
}
