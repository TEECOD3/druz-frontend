import {
  LOGIN_FAILURE,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED_FAILURE,
  CLEAR_ERRORS,
  SET_LOADING,
  LOGOUT,
  REGISTER_LOGIN_LOADING,
  ANSWERS_LOADED,
  ANSWERS_LOAD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  CLEAR_FORGOT_PASSWORD_SUCCESS,
  CLEAR_RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
} from "../types/authTypes";
import IError from "types/errors";
import IUser from "types/user";
import IAnswer from "types/answer";

export interface AuthState {
  token: string | boolean | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  errors: IError | null;
  registerLoginLoading: boolean;
  registerLoading: boolean;
  answers: IAnswer | null;
  forgotPasswordSuccess: boolean | null;
  forgotPasswordLoading: boolean;
  resetPasswordSuccess: boolean | null;
  resetPasswordLoading: boolean;
}

type Action =
  | { type: typeof REGISTER_SUCCESS; payload: string | null }
  | { type: typeof LOGIN_SUCCESS; payload: string | null }
  | { type: typeof USER_LOADED; payload: IUser | null }
  | { type: typeof ANSWERS_LOADED; payload: IAnswer | null }
  | { type: typeof USER_LOADED_FAILURE; payload: IError | null }
  | { type: typeof REGISTER_FAILURE; payload: IError | null }
  | { type: typeof LOGIN_FAILURE; payload: IError | null }
  | { type: typeof LOGOUT }
  | { type: typeof ANSWERS_LOAD_FAILURE; payload: IError | null }
  | { type: typeof SET_LOADING }
  | { type: typeof CLEAR_ERRORS }
  | { type: typeof REGISTER_LOGIN_LOADING }
  | { type: typeof CLEAR_RESET_PASSWORD_SUCCESS }
  | { type: typeof FORGOT_PASSWORD_SUCCESS }
  | { type: typeof FORGOT_PASSWORD_FAILURE; payload: IError | null }
  | { type: typeof FORGOT_PASSWORD_LOADING }
  | { type: typeof CLEAR_FORGOT_PASSWORD_SUCCESS }
  | { type: typeof RESET_PASSWORD_SUCCESS }
  | { type: typeof RESET_PASSWORD_FAILURE; payload: IError | null }
  | { type: typeof RESET_PASSWORD_LOADING };

export const initialState: AuthState = {
  token: typeof window !== "undefined" && localStorage.getItem("token"),
  loading: false,
  isAuthenticated: false,
  user: null,
  errors: null,
  registerLoginLoading: false,
  registerLoading: false,
  answers: null,
  forgotPasswordSuccess: null,
  forgotPasswordLoading: false,
  resetPasswordSuccess: null,
  resetPasswordLoading: false,
};

const AuthReducer: React.Reducer<AuthState, Action> = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        registerLoginLoading: false,
        errors: null,
        loading: false,
        token: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        registerLoginLoading: false,
        errors: null,
        loading: false,
        token: action.payload,
      };
    case REGISTER_LOGIN_LOADING:
      return {
        ...state,
        registerLoginLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        errors: null,
        user: action.payload,
        loading: false,
      };
    case ANSWERS_LOADED:
      return {
        ...state,
        answers: action.payload,
        loading: false,
      };
    case ANSWERS_LOAD_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: true,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: false,
        errors: action.payload,
      };
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        forgotPasswordLoading: true,
      };
    case CLEAR_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: true,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: false,
        errors: action.payload,
      };
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordLoading: true,
      };
    case CLEAR_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: null,
      };
    case USER_LOADED_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errors: action.payload,
        user: null,
        loading: false,
        registerLoginLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        registerLoginLoading: false,
      };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    default:
      return state;
  }
};

export default AuthReducer;
