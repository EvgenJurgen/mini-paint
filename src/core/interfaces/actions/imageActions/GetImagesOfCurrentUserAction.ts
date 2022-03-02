import { ImageActionTypes } from '../../../actions/imageActions';
import { GetImagesOfCurrentUserPayload } from '../../payloads/GetImagesOfCurrentUserPayload';

export interface GetImagesOfCurrentUserAction {
  type: ImageActionTypes.GET_IMAGES_OF_CURRENT_USER;
  payload: GetImagesOfCurrentUserPayload;
}
