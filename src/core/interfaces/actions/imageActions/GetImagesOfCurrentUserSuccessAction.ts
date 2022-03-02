import { ImageActionTypes } from '../../../actions/imageActions';
import { ArrayOfImages } from '../../payloads/ArrayOfImages';

export interface GetImagesOfCurrentUserSuccessAction {
  type: ImageActionTypes.GET_IMAGES_OF_CURRENT_USER_SUCCESS;
  payload: ArrayOfImages;
}
