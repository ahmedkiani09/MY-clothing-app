export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// INITIAL STATE:
const INITIAL_STATE = {
  currentUser: null,
};

// REDUCER FUNCTION:
export const userReducer = (state = INITIAL_STATE, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;

  switch (USER_ACTION_TYPES.SET_CURRENT_USER) {
    case "SET_CURRENT_USER": {
      return {
        ...state,
        currentUser: payload,
      };
    }

    default: {
      throw new Error("Unhandled action type:" + type);
    }
  }
};
