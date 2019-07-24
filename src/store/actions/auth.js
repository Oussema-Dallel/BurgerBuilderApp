import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authLogout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBcht6Z75dRBidUJkfn9agOHtFeMelSgRg";
    if (!isSignup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBcht6Z75dRBidUJkfn9agOHtFeMelSgRg";
    }
    axios
      .post(url, authData)
      .then(response => {
        localStorage.setItem("token", response.data.idToken);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("localId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authLogout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authRedirectPath = path => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckStatus = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    const localId = localStorage.getItem("localId");

    if (!token) {
      dispatch(logout());
    } else if (new Date(expirationDate) <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, localId));
      dispatch(authLogout((new Date(expirationDate) - new Date()) / 1000));
    }
  };
};
