import { ImageActionTypes } from '../../../actions/imageActions';
import { ImageUrl } from '../../payloads/ImageUrl';

export interface DeleteImageByUrlSuccessAction {
  type: ImageActionTypes.DELETE_IMAGE_BY_URL_SUCCESS;
  payload: ImageUrl;
}
