import { ImageActionTypes } from '../../../actions/imageActions';
import { ImageOfUser } from '../../payloads/ImageOfUser';

export interface SaveImageOfUserAction {
  type: ImageActionTypes.SAVE_IMAGE_OF_USER;
  payload: ImageOfUser;
}
