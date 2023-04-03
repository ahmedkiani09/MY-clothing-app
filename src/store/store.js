import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

// import { logger } from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddlware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("Payload", action.payload);
  console.log("state", store.getState());

  next(action);

  console.log("next state", store.getState());
};

const middleWares = [loggerMiddlware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//  The second argument is the additional default state. (which now is undefined)
export const store = createStore(rootReducer, undefined, composedEnhancers);

// ! currying concept (function calling other functions)
// const curryFunc = (a) => (b, c) => (d, e) => console.log(a + b - (c * d) / e);

// const with3 = curryFunc(2);
// const with3and4 = with3(3, 4);
// with3and4(5, 6);

// const with10 = curryFunc(10);
// const with5 = with10(15, 20);
// with5(25, 30);
