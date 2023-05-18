import { all, call, put, takeLatest } from "redux-saga/effects"; // side effects

import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories-action";
import { CATEGORIES_ACTION_TYPES } from "./categories-types";

// ? sagas have redux bindings on them meaning we can access state, use dispatch etc within the generator functions. Redux Saga provides several built-in effects that allow you to interact with the Redux store and perform actions such as dispatching actions or accessing the current state.
// generator functions:
export const fetchCategoriesAsync = function* () {
  try {
    //? Useful info: anywhere you have function and you want to turn it into a effect we use call.
    //! you can not pass the paramters as ordinary function but like this: getCollectionsAndDocuments, 'categories'.
    const categoriesArray = yield call(getCollectionsAndDocuments); // similar to as await

    yield put(fetchCategoriesSuccess(categoriesArray)); // similar to as dispatch
  } catch (error) {
    yield put(fetchCategoriesFailed(error)); // similar to as dispatch
  }
};

export const onFetchCategories = function* () {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
};

export const categoriesSaga = function* () {
  yield all([call(onFetchCategories)]); // accepts generator functions and runs thems all and then we can proceed next.
};

//? Useful info: chatGpt explanation about generator functions with examples
// Generator functions are a special type of function in JavaScript that can be paused and resumed during their execution. They allow you to generate a sequence of values over time instead of returning a single value. Generator functions are defined using the function* syntax.

// Example:
// function* numberGenerator() {
//   let number = 1;
//   while (true) {
//     yield number;
//     number++;
//   }
// }

// const generator = numberGenerator();
// console.log(generator.next().value); // Output: 1
// console.log(generator.next().value); // Output: 2
// console.log(generator.next().value); // Output: 3
// and so on...
