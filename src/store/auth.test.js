import reducer from "./auth";
import * as actionTypes from "./actions/actionTypes";

describe("auth reducer", () => {
  let initialState = null;
  beforeEach(() => {
    initialState = {
      idToken: null,
      localId: null,
      loading: false,
      error: null,
      path: "/"
    };
  });

  it("should return the initial state upon start", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should return a token and a userId upon login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some-token",
        localId: "some-userId"
      })
    ).toEqual({
      ...initialState,
      idToken: "some-token",
      localId: "some-userId"
    });
  });
});
