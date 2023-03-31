import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import { logger } from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//  The second argument is the additional default state. (which now is undefined)
export const store = createStore(rootReducer, undefined, composedEnhancers);
