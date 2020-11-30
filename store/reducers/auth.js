import { AUTHENTICATE, LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  userEmail: "SYSTEM",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        token: action.token,
        userId: action.userId,
      };
    }
    case LOGIN: {
      return {
        token: action.token,
        userId: action.userId,
        userEmail: action.userEmail,
      };
    }
    case SIGNUP: {
      return {
        token: action.token,
        userId: action.userId,
        userEmail: action.userEmail,
      };
    }
    default: {
      return state;
    }
  }
};
