import { DeleteImageByUrlAction } from '../interfaces/actions/imageActions/DeleteImageByUrlAction';
import { DeleteImageByUrlSuccessAction } from '../interfaces/actions/imageActions/DeleteImageByUrlSuccessAction';
import { GetImagesOfAllUsersAction } from '../interfaces/actions/imageActions/GetImagesOfAllUsersAction';
import { GetImagesOfAllUsersSuccessAction } from '../interfaces/actions/imageActions/GetImagesOfAllUsersSuccessAction';
import { GetImagesOfCurrentUserAction } from '../interfaces/actions/imageActions/GetImagesOfCurrentUserAction';
import { GetImagesOfCurrentUserSuccessAction } from '../interfaces/actions/imageActions/GetImagesOfCurrentUserSuccessAction';
import { RecordAnImageErrorAction } from '../interfaces/actions/imageActions/RecordAnImageErrorAction';
import { RemoveImageErrorAction } from '../interfaces/actions/imageActions/RemoveImageErrorAction';
import { removeMessageAboutSavingAnImageAction } from '../interfaces/actions/imageActions/RemoveMessageAboutSavinAnImageAction';
import { SaveImageOfUserAction } from '../interfaces/actions/imageActions/SaveImageOfUserAction';
import { SaveImageOfUserSuccessAction } from '../interfaces/actions/imageActions/SaveImageOfUserSuccessAction';
import { ArrayOfImages } from '../interfaces/payloads/ArrayOfImages';
import { ArrayOfUserDataWithImages } from '../interfaces/payloads/ArrayOfUserDataWithImages';
import { GetImagesOfCurrentUserPayload } from '../interfaces/payloads/GetImagesOfCurrentUserPayload';
import { ImageOfUser } from '../interfaces/payloads/ImageOfUser';
import { ImageUrl } from '../interfaces/payloads/ImageUrl';
import { RecordAnErrorPayload } from '../interfaces/payloads/RecordAnErrorPayload';

export enum ImageActionTypes {
  GET_IMAGES_OF_CURRENT_USER = 'image/getImagesOfCurrentUser',
  GET_IMAGES_OF_CURRENT_USER_SUCCESS = 'image/getImagesOfCurrentUserSuccess',
  GET_IMAGES_OF_ALL_USERS = 'image/getImagesOfAllUsers',
  GET_IMAGES_OF_ALL_USERS_SUCCESS = 'image/getImagesOfAllUsersSuccess',
  SAVE_IMAGE_OF_USER = 'image/saveImageOfUser',
  SAVE_IMAGE_OF_USER_SUCCESS = 'image/saveImageOfUserSuccess',
  DELETE_IMAGE_BY_URL = 'image/deleteImageByUrl',
  DELETE_IMAGE_BY_URL_SUCCESS = 'image/deleteImageByUrlSuccess',
  RECORD_AN_IMAGE_ERROR = 'user/recordAnImageError',
  REMOVE_IMAGE_ERROR = 'image/removeImageError',
  REMOVE_MESSAGE_ABOUT_SAVING_AN_IMAGE = 'image/removeMessageAboutSavingAnImage',
}

export const getImagesOfCurrentUser = (
  payload: GetImagesOfCurrentUserPayload
): GetImagesOfCurrentUserAction => ({
  type: ImageActionTypes.GET_IMAGES_OF_CURRENT_USER,
  payload,
});

export const getImagesOfCurrentUserSuccess = (
  payload: ArrayOfImages
): GetImagesOfCurrentUserSuccessAction => ({
  type: ImageActionTypes.GET_IMAGES_OF_CURRENT_USER_SUCCESS,
  payload,
});

export const getImagesOfAllUsers = (): GetImagesOfAllUsersAction => ({
  type: ImageActionTypes.GET_IMAGES_OF_ALL_USERS,
});

export const getImagesOfAllUsersSuccess = (
  payload: ArrayOfUserDataWithImages
): GetImagesOfAllUsersSuccessAction => ({
  type: ImageActionTypes.GET_IMAGES_OF_ALL_USERS_SUCCESS,
  payload,
});

export const saveImageOfUser = (payload: ImageOfUser): SaveImageOfUserAction => ({
  type: ImageActionTypes.SAVE_IMAGE_OF_USER,
  payload,
});

export const saveImageOfUserSuccess = (): SaveImageOfUserSuccessAction => ({
  type: ImageActionTypes.SAVE_IMAGE_OF_USER_SUCCESS,
});

export const deleteImageByUrl = (payload: ImageUrl): DeleteImageByUrlAction => ({
  type: ImageActionTypes.DELETE_IMAGE_BY_URL,
  payload,
});

export const deleteImageByUrlSuccess = (payload: ImageUrl): DeleteImageByUrlSuccessAction => ({
  type: ImageActionTypes.DELETE_IMAGE_BY_URL_SUCCESS,
  payload,
});

export const recordAnImageError = (payload: RecordAnErrorPayload): RecordAnImageErrorAction => ({
  type: ImageActionTypes.RECORD_AN_IMAGE_ERROR,
  payload,
});

export const removeImageError = (): RemoveImageErrorAction => ({
  type: ImageActionTypes.REMOVE_IMAGE_ERROR,
});

export const removeMessageAboutSavingAnImage = (): removeMessageAboutSavingAnImageAction => ({
  type: ImageActionTypes.REMOVE_MESSAGE_ABOUT_SAVING_AN_IMAGE,
});
