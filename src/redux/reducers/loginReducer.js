import actionTypes from "../actions/actionTypes";

const initialState = {
  success: false,
  username: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loginActions.LOGIN_SUCCESS:
      return {
        success: true,
        username: action.payload,
      };
    case actionTypes.loginActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
