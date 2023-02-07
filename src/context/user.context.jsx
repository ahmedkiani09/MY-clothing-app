import { createContext, useState, useEffect } from "react";
import { ourAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser };

  useEffect(() => {
    const unSubscribe = ourAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
