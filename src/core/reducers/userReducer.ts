import { UserActionTypes } from '../actions/userActions';
import { UserActions } from '../interfaces/actions/userActions';
import { RecordAnErrorPayload } from '../interfaces/payloads/RecordAnErrorPayload';

interface State {
  user: {
    nickname: string;
    email: string;
    uid: string;
  };
  isLoading: boolean;
  error: RecordAnErrorPayload;
}

const initialState: State = {
  user: {
    nickname: '',
    email: '',
    uid: '',
  },
  isLoading: false,
  error: '',
};

export default function userReducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.REGISTER_USER:
      return { ...state, isLoading: true };
    case UserActionTypes.LOGIN_USER:
      return { ...state, isLoading: true };
    case UserActionTypes.GET_USER:
      return { ...state, isLoading: true };
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: {
          email: action.payload.email,
          uid: action.payload.uid,
          nickname: action.payload.nickname,
        },
        isLoading: false,
      };
    case UserActionTypes.LOGOUT:
      return { ...state, isLoading: true };
    case UserActionTypes.LOGOUT_SUCCESS:
      return { ...state, ...initialState };
    case UserActionTypes.RECORD_AN_USER_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case UserActionTypes.REMOVE_USER_ERROR:
      return { ...state, error: initialState.error };
    default:
      return state;
  }
}
