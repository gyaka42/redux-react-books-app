import actionTypes from "../actions/actionTypes";

const initialState = "light";

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.themeActions.CHANGE_THEME:
      return action.payload;

    default:
      return state;
  }
};

export default themeReducer;
