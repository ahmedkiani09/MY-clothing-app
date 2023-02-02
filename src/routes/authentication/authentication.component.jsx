import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form /sign-in-form.component";
import "./authentication.style.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;

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
