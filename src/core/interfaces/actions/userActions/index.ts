import { GetUserAction } from './GetUserAction';
import { GetUserSuccessAction } from './GetUserSuccessAction';
import { LoginUserAction } from './LoginUserAction';
import { LogoutAction } from './LogoutAction';
import { LogoutSuccessAction } from './LogoutSuccessAction';
import { RecordAnUserErrorAction } from './RecordAnUserErrorAction';
import { RegisterUserAction } from './RegisterUserAction';
import { RemoveUserErrorAction } from './RemoveUserErrorAction';

export type UserActions =
  | RegisterUserAction
  | LoginUserAction
  | GetUserAction
  | GetUserSuccessAction
  | LogoutAction
  | LogoutSuccessAction
  | RecordAnUserErrorAction
  | RemoveUserErrorAction;
