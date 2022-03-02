import { ImageActionTypes } from '../actions/imageActions';
import { ImageActions } from '../interfaces/actions/imageActions';
import { ArrayOfImages } from '../interfaces/payloads/ArrayOfImages';
import { ArrayOfUserDataWithImages } from '../interfaces/payloads/ArrayOfUserDataWithImages';
import { RecordAnErrorPayload } from '../interfaces/payloads/RecordAnErrorPayload';

interface State {
  imagesOfCurrentUser: ArrayOfImages;
  imagesOfAllUsers: ArrayOfUserDataWithImages;
  isLoading: boolean;
  error: RecordAnErrorPayload;
  isPictureSaved: boolean;
}

const initialState: State = {
  imagesOfCurrentUser: [],
  imagesOfAllUsers: [],
  isLoading: false,
  error: '',
  isPictureSaved: false,
};

export default function imageReducer(state = initialState, action: ImageActions): State {
  switch (action.type) {
    case ImageActionTypes.GET_IMAGES_OF_CURRENT_USER:
      return { ...state, isLoading: true };
    case ImageActionTypes.GET_IMAGES_OF_CURRENT_USER_SUCCESS:
      return { ...state, imagesOfCurrentUser: action.payload, isLoading: false };
    case ImageActionTypes.GET_IMAGES_OF_ALL_USERS:
      return { ...state, isLoading: true };
    case ImageActionTypes.GET_IMAGES_OF_ALL_USERS_SUCCESS:
      return { ...state, imagesOfAllUsers: action.payload, isLoading: false };
    case ImageActionTypes.SAVE_IMAGE_OF_USER:
      return { ...state, isLoading: true };
    case ImageActionTypes.SAVE_IMAGE_OF_USER_SUCCESS:
      return { ...state, isPictureSaved: true, isLoading: false };
    case ImageActionTypes.DELETE_IMAGE_BY_URL:
      return { ...state, isLoading: true };
    case ImageActionTypes.DELETE_IMAGE_BY_URL_SUCCESS:
      return {
        ...state,
        imagesOfCurrentUser: state.imagesOfCurrentUser.filter(
          (imageUrl) => imageUrl != action.payload.url
        ),
        isLoading: false,
      };
    case ImageActionTypes.RECORD_AN_IMAGE_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ImageActionTypes.REMOVE_IMAGE_ERROR:
      return { ...state, error: initialState.error };
    case ImageActionTypes.REMOVE_MESSAGE_ABOUT_SAVING_AN_IMAGE:
      return { ...state, isPictureSaved: false };
    default:
      return state;
  }
}
