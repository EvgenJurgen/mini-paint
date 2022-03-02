import { UserActionTypes } from '../../../actions/userActions';
import { RecordAnErrorPayload } from '../../payloads/RecordAnErrorPayload';

export interface RecordAnUserErrorAction {
  type: UserActionTypes.RECORD_AN_USER_ERROR;
  payload: RecordAnErrorPayload;
}
