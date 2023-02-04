import { useState } from "react";
import "./sign-in-form.style.scss";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input /formInput.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [newFormFields, setNewFormFields] = useState(defaultFormFields);
  const { email, password } = newFormFields;

  const clearInputFields = () => setNewFormFields(defaultFormFields);

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const submitFunction = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      clearInputFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password. Please try again.");
          break;
        case "auth/user-not-found":
          alert("User not found. Please check your email and try again.");
          break;
        case "auth/invalid-email":
          alert("Invalid email. Please check the format and try again.");
          break;
        default:
          alert("An error occurred. Please try again later.");
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFormFields({ ...newFormFields, [name]: value }); //* this is an computed property '[name]: value' learn more from previous chat with chatGPT // * everytime you use spread operator and surrond it within object and then you set the existing value of property on the previous object to some new value then the new property will not be added instead this will replace the existing value of property with the new value.
  };

  return (
    <div className="sign-in-container">
      <h2> Already have an account? </h2>
      <span> sign in with email and password </span>
      <form onSubmit={submitFunction}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          s
        />
        <div className="buttons-container">
          <Button type="submit"> Sign-in </Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign-In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

/* spread Operator special case:
const ahmed = {
  FirstName: "ahmed",
  lastName: "Kiani",
};

console.log({ ...ahmed, FirstName: "Umer" });
*/
