import { createSelector } from "reselect";
import { CategoriesState } from "./categories-reducer";
import { CategoryMap } from "./categories-types";

// ! these all steps are a concept called memoization. Memoization is simply avoiding unnecessary steps that are already done. means if you have alreaday evaluated result of certain function and it is present in your app or wherever you stor it then it will not re-run the whole process again but it will catch the previously held values.
// ? Here we are doing it because we were facing unnecessary re-renders so after this solution the selectors 2 and 3 will only get fired when categoriesSLlice which we are geting from the CategoriesReducer changes or the categoriesMap value changes meaning if we are on the hats page and just logging out the user then there is no involvement of the categories reducer or categories maps only the user reducer receives the action which asks it to change the state of the current user or simply change the user. then only that user selector will be fired but not the categories selctor.

// ! this here is selecting the categoriesReducer Slice in the root reducer
const selectCategoryReducerSlice = (state): CategoriesState => {
  // console.log("selector 1 fired");
  return state.categories;
};

// ! this here is selecting the categories i.e: hats, mens, womens, etc...
export const selectCategories = createSelector(
  [selectCategoryReducerSlice],
  (categoriesReducerSlice) => {
    // console.log("selector 2 fired");
    return categoriesReducerSlice.categoriesArray;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // console.log("selector 3 fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesMap],
  (categories) => categories.isLoading
);

// ? chatGpt's explanation:
// The code is implementing Redux, which is a state management library for JavaScript applications.

// There is a reducer called selectCategoryReducer that is responsible for managing the state of a slice of the Redux store called categories.

// There are two selectors being used: selectCategories and selectCategoriesMap.

// selectCategories selects the categories array from the Redux store, while selectCategoriesMap maps over the categories array and returns an object that maps category IDs to category objects.

// In this specific instance, selectCategories is not being used to directly obtain the categoriesMap from selectCategoryReducer, even though it could be done this way.

// The reason for using an intermediate selector like selectCategories is to future-proof the architecture in case the categories slice of the store were to store more state values in the future.

// If the categories slice were to store more state values, then selectCategoriesMap would run its reduce function every time something in the categories slice changes, even if the categories array itself didn't change.

// By using selectCategories to select the categories array itself, the architecture ensures that selectCategoriesMap only runs the reduce transform if the categories array changes.

// In summary, using an intermediate selector like selectCategories is a good practice in Redux applications to future-proof the architecture and ensure that selectors only run when necessary.
