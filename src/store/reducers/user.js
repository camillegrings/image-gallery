import {
  USER_LOGGED_ID,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
  PROFILE_UPDATED
} from "../actions/actionTypes";

const initalState = {
  id: "",
  name: null,
  email: null,
  isLoading: false,
  token: null,
  profilePhoto: ""
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case USER_LOGGED_ID:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
        profilePhoto: action.payload.profilePhoto
      };
    case USER_LOGGED_OUT:
      return {
        ...initalState
      };
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false
      };
    case PROFILE_UPDATED:
      return {
        ...state,
        profilePhoto: action.payload.profilePhoto
      };

    default:
      return state;
  }
};

export default reducer;
