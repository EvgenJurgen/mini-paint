import { ImageActionTypes } from '../../../actions/imageActions';
import { ArrayOfUserDataWithImages } from '../../payloads/ArrayOfUserDataWithImages';

export interface GetImagesOfAllUsersSuccessAction {
  type: ImageActionTypes.GET_IMAGES_OF_ALL_USERS_SUCCESS;
  payload: ArrayOfUserDataWithImages;
}
