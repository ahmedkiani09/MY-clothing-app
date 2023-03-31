// import { createContext, useReducer } from "react";

// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => {},
// });

// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER: "SET_CURRENT_USER",
// };

// // REDUCER FUNCTION:
// const userReducer = (state, action) => {
//   console.log("dispatched");
//   console.log(action);
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER: {
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     }

//     default: {
//       throw new Error("Unhandled action type:" + type);
//     }
//   }
// };

// // INITIAL STATE:
// const INITIAL_STATE = {
//   currentUser: null,
// };
//
// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
//   const { currentUser } = state;
//   const setCurrentUser = (user) => {
//     dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
//   };
//   const value = { currentUser, setCurrentUser };
//   // useEffect(() => {
//   //   const unSubscribe = ourAuthStateChangedListener((user) => {
//   //     if (user) {
//   //       createUserDocumentFromAuth(user);
//   //     }
//   //     setCurrentUser(user);
//   //     console.log("user", user);
//   //     console.log("useEffect");
//   //   });
//   //   return unSubscribe;
//   // }, []);
//   return (
//     <UserContext.Provider value={value}> {children} </UserContext.Provider>
//   );
// };
//
