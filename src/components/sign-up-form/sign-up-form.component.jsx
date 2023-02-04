import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input /formInput.component";
import "./sign-up-form.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [newFormFields, setNewFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = newFormFields;

  const clearInputFields = () => setNewFormFields(defaultFormFields);

  const submitFunction = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return alert("passwords does not match");
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });

      clearInputFields();
    } catch (error) {
      console.error("Error while signing up:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email already in use. Please choose another one.");
          break;
        case "auth/invalid-email":
          alert("Invalid email address. Please enter a valid email.");
          break;
        default:
          alert("An error occured while signing up. Please try again later.");
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFormFields({ ...newFormFields, [name]: value }); //* this is an computed property '[name]: value' learn more from previous chat with chatGPT // * everytime you use spread operator and surrond it within object and then you set the existing value of property on the previous object to some new value then the new property will not be added instead this will replace the existing value of property with the new value.
  };

  return (
    <div className="sign-up-container">
      <h2> Don't have an account? </h2>
      <span> Sign up with your email and password </span>
      <form onSubmit={submitFunction}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName" // * this name is used here to change the state using useState hook so there must be same property name as in the initial state object
          value={displayName} // * this is the new value to which the property is being updated.
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button children="sign-up" type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;

/* spread Operator special case:
const ahmed = {
  FirstName: "ahmed",
  lastName: "Kiani",
};

console.log({ ...ahmed, FirstName: "Umer" });
*/
