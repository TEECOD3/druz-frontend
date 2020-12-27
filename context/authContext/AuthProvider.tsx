import * as React from "react";
import axios from "axios";
import {
  USER_LOADED_FAILURE,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERRORS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOADING,
  REGISTER_LOGIN_LOADING,
  ANSWERS_LOADED,
  ANSWERS_LOAD_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  CLEAR_FORGOT_PASSWORD_SUCCESS,
  CLEAR_RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
} from "../types/authTypes";
import AuthReducer, { initialState, AuthState } from "./AuthReducer";

interface IAuthFunctions {
  resetPassword: (
    data: { password: string },
    token: string,
    email: string,
  ) => void;
  loginUser: (user: { name: string; password: string }) => void;
  loadUser: () => void;
  loadUserWithAnswers: () => void;
  registerUser: (user: {
    name: string;
    email: string;
    password: string;
  }) => void;
  clearErrors: () => void;
  logout: () => void;
  forgotPassword: (data: { name: string }) => void;
  clearForgotPasswordSuccess: () => void;
  clearResetPasswordSuccess: () => void;
}

export const AuthContext = React.createContext<
  (AuthState & IAuthFunctions) | null
>(null);

const AuthStateProvider: React.FC<React.ReactNode> = (props) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/v1/auth/user");
      dispatch({
        type: USER_LOADED,
        payload: res.data.data.user,
      });
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      typeof window !== "undefined" &&
        localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      typeof window !== "undefined" && localStorage.removeItem("token");
      typeof window !== "undefined" &&
        localStorage.removeItem("isAuthenticated");
      typeof window !== "undefined" && localStorage.removeItem("user");
      dispatch({
        type: USER_LOADED_FAILURE,
        payload: err,
      });
    }
  };

  const loadUserWithAnswers = async (page = 1) => {
    try {
      setLoading();
      const res = await axios.get(
        `/api/v1/auth/user?alongwith=answers&page=${page}`,
      );
      dispatch({
        type: ANSWERS_LOADED,
        payload: res.data.data.user.answers,
      });
    } catch (err) {
      dispatch({
        type: ANSWERS_LOAD_FAILURE,
        payload: err,
      });
    }
  };

  const registerUser = async (user: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading();
      dispatch({
        type: REGISTER_LOGIN_LOADING,
      });
      const res = await axios.post("/api/v1/auth/register", user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.data.token,
      });
      typeof window !== "undefined" &&
        localStorage.setItem("token", res.data.data.token);
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      typeof window !== "undefined" &&
        localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      typeof window !== "undefined" && localStorage.removeItem("token");
      typeof window !== "undefined" && localStorage.removeItem("user");
      typeof window !== "undefined" &&
        localStorage.removeItem("isAuthenticated");
      if (err.response) {
        if (err.response.data) {
          dispatch({
            type: REGISTER_FAILURE,
            payload: err.response.data.errors,
          });
        } else if (err.response.status) {
          const status = err.response.status;
          if (/^4/.test(status)) {
            dispatch({
              type: REGISTER_FAILURE,
              payload: [{ msg: "Invalid values entered. Please try again" }],
            });
          } else if (/^5/.test(status)) {
            dispatch({
              type: REGISTER_FAILURE,
              payload: [
                { msg: "Something went wrong. Please refresh and try again" },
              ],
            });
          }
        }
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          payload: [
            { msg: "Something went wrong. Please refresh and try again" },
          ],
        });
      }
    }
  };

  const loginUser = async (user: { name: string; password: string }) => {
    try {
      setLoading();
      dispatch({
        type: REGISTER_LOGIN_LOADING,
      });
      const res = await axios.post("/api/v1/auth/login", user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data.token,
      });
      // set basic user data
      typeof window !== "undefined" &&
        localStorage.setItem("token", res.data.data.token);
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      typeof window !== "undefined" &&
        localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      typeof window !== "undefined" && localStorage.removeItem("token");
      typeof window !== "undefined" && localStorage.removeItem("user");
      typeof window !== "undefined" &&
        localStorage.removeItem("isAuthenticated");
      if (err.response) {
        if (err.response.data) {
          dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data.errors,
          });
        } else if (err.response.status) {
          const status = err.response.status;
          if (/^4/.test(status)) {
            dispatch({
              type: LOGIN_FAILURE,
              payload: [{ msg: "Invalid values entered. Please try again" }],
            });
          } else if (/^5/.test(status)) {
            dispatch({
              type: LOGIN_FAILURE,
              payload: [
                { msg: "Something went wrong. Please refresh and try again" },
              ],
            });
          }
        }
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: [
            { msg: "Something went wrong. Please refresh and try again" },
          ],
        });
      }
    }
  };

  const forgotPassword = async (data: { name: string }) => {
    try {
      setForgotPasswordLoading();
      await axios.post("/api/v1/auth/forgot-password", data);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
      });
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: err.response.data.errors,
          });
        } else if (err.response.status) {
          const status = err.response.status;
          if (/^4/.test(status)) {
            dispatch({
              type: FORGOT_PASSWORD_FAILURE,
              payload: [{ msg: "Invalid values entered. Please try again" }],
            });
          } else if (/^5/.test(status)) {
            dispatch({
              type: FORGOT_PASSWORD_FAILURE,
              payload: [
                { msg: "Something went wrong. Please refresh and try again" },
              ],
            });
          }
        }
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          payload: [
            { msg: "Something went wrong. Please refresh and try again" },
          ],
        });
      }
    }
  };

  const resetPassword = async (
    data: { password: string },
    token: string,
    email: string,
  ) => {
    try {
      setResetPasswordLoading();
      await axios.patch(`/api/v1/auth/reset-password/${token}/${email}`, data);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: err.response.data.errors,
          });
        } else if (err.response.status) {
          const status = err.response.status;
          if (/^4/.test(status)) {
            dispatch({
              type: RESET_PASSWORD_FAILURE,
              payload: [{ msg: "Incorrect credentials entered." }],
            });
          } else if (/^5/.test(status)) {
            dispatch({
              type: RESET_PASSWORD_FAILURE,
              payload: [
                { msg: "Something went wrong. Please refresh and try again" },
              ],
            });
          }
        }
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          payload: [
            { msg: "Something went wrong. Please refresh and try again" },
          ],
        });
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      typeof window !== "undefined" && localStorage.removeItem("user");
      typeof window !== "undefined" && localStorage.removeItem("token");
      typeof window !== "undefined" &&
        localStorage.removeItem("isAuthenticated");
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      console.log("logout unsuccessful");
    }
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const clearForgotPasswordSuccess = () => {
    dispatch({
      type: CLEAR_FORGOT_PASSWORD_SUCCESS,
    });
  };

  const clearResetPasswordSuccess = () => {
    dispatch({
      type: CLEAR_RESET_PASSWORD_SUCCESS,
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const setForgotPasswordLoading = () => {
    dispatch({
      type: FORGOT_PASSWORD_LOADING,
    });
  };

  const setResetPasswordLoading = () => {
    dispatch({
      type: RESET_PASSWORD_LOADING,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        registerLoading: state.registerLoading,
        registerLoginLoading: state.registerLoginLoading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        errors: state.errors,
        answers: state.answers,
        forgotPasswordSuccess: state.forgotPasswordSuccess,
        forgotPasswordLoading: state.forgotPasswordLoading,
        resetPasswordSuccess: state.resetPasswordSuccess,
        resetPasswordLoading: state.resetPasswordLoading,
        resetPassword,
        loginUser,
        loadUser,
        loadUserWithAnswers,
        registerUser,
        clearErrors,
        logout,
        forgotPassword,
        clearForgotPasswordSuccess,
        clearResetPasswordSuccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStateProvider;
