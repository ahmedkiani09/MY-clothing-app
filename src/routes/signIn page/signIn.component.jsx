import { async } from "@firebase/util";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIN = () => {
  const logGooglePopupUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooglePopupUser}> sign-in-with-popup </button>
      <SignUpForm />
    </div>
  );
};
export default SignIN;

/*
firebase Utils file:
 // signInWithRedirect,
 // export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

this file:
// import { useEffect } from "react";
// import auth, signInWithGoogleRedirect from "../../utils/firebase/firebase.utils"
// import { getRedirectResult } from "firebase/auth";

  useEffect(() => {
    const redirectFunction = async () => {
      const response = await getRedirectResult(auth); // * NOTE: we are passing the auth here because this is the variable equal to getAuth() and it keep tracks of all the authentication that happens in the application.
      console.log(response);

      if (!response) return;

      const userDocRef = await createUserDocumentFromAuth(response.user);
      console.log(userDocRef);
    };
    redirectFunction();
  }, []);

  <button onClick={signInWithGoogleRedirect}>
        {" "}
        sign-in-with-redirect{" "}
      </button>
*/
