export const loggerMiddlware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("Payload", action.payload);
  console.log("state", store.getState());

  next(action);

  console.log("next state", store.getState());
};
