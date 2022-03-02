import { ImageActionTypes } from '../../../actions/imageActions';
import { RecordAnErrorPayload } from '../../payloads/RecordAnErrorPayload';

export interface RecordAnImageErrorAction {
  type: ImageActionTypes.RECORD_AN_IMAGE_ERROR;
  payload: RecordAnErrorPayload;
}
