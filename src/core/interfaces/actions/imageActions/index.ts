import { DeleteImageByUrlAction } from './DeleteImageByUrlAction';
import { DeleteImageByUrlSuccessAction } from './DeleteImageByUrlSuccessAction';
import { GetImagesOfAllUsersAction } from './GetImagesOfAllUsersAction';
import { GetImagesOfAllUsersSuccessAction } from './GetImagesOfAllUsersSuccessAction';
import { GetImagesOfCurrentUserAction } from './GetImagesOfCurrentUserAction';
import { GetImagesOfCurrentUserSuccessAction } from './GetImagesOfCurrentUserSuccessAction';
import { RecordAnImageErrorAction } from './RecordAnImageErrorAction';
import { RemoveImageErrorAction } from './RemoveImageErrorAction';
import { removeMessageAboutSavingAnImageAction } from './RemoveMessageAboutSavinAnImageAction';
import { SaveImageOfUserAction } from './SaveImageOfUserAction';
import { SaveImageOfUserSuccessAction } from './SaveImageOfUserSuccessAction';

export type ImageActions =
  | GetImagesOfCurrentUserAction
  | GetImagesOfCurrentUserSuccessAction
  | GetImagesOfAllUsersAction
  | GetImagesOfAllUsersSuccessAction
  | SaveImageOfUserAction
  | SaveImageOfUserSuccessAction
  | DeleteImageByUrlAction
  | DeleteImageByUrlSuccessAction
  | RecordAnImageErrorAction
  | RemoveImageErrorAction
  | removeMessageAboutSavingAnImageAction;
