import * as actionTypes from "./actions/actionTypes";

const initialState = {
  idToken: null,
  localId: null,
  loading: false,
  error: null,
  path: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        idToken: action.idToken,
        localId: action.localId
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        idToken: null,
        localId: null
      };
    case actionTypes.AUTH_REDIRECT_PATH:
      return {
        ...state,
        path: action.path
      };
    default:
      return state;
  }
};

export default reducer;
