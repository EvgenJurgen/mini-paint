import { ImageActionTypes } from '../../../actions/imageActions';
import { ImageUrl } from '../../payloads/ImageUrl';

export interface DeleteImageByUrlAction {
  type: ImageActionTypes.DELETE_IMAGE_BY_URL;
  payload: ImageUrl;
}
