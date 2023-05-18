import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import { logger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//  The second argument is the additional default state. (which now is undefined)
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

//? Useful Info: this is unique to redux saga middleware and it is done here after the store is instantiated and it includes saga middleWare in it.
sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);

// ! Important concept: currying concept (function calling other functions)
// const curryFunc = (a) => (b, c) => (d, e) => console.log(a + b - (c * d) / e);

// const with3 = curryFunc(2);
// const with3and4 = with3(3, 4);
// with3and4(5, 6);

// const with10 = curryFunc(10);
// const with5 = with10(15, 20);
// with5(25, 30);
