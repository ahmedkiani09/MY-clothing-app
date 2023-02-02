import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFormFields({ ...newFormFields, [name]: value }); //* this is an computed property '[name]: value' learn more from previous chat with chatGPT // * everytime you use spread operator and surrond it within object and then you set the existing value of property on the previous object to some new value then the new property will not be added instead this will replace the existing value of property with the new value.
    console.log({ [name]: value });
  };
  console.log(newFormFields);

  return (
    <div>
      <h1> Sign up with your email and password </h1>
      <form onSubmit={submitFunction}>
        <label> Display Name </label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName" // * this name is used here to change the state using useState hook so there must be same property name as in the initial state object
          value={displayName} // * this is the new value to which the property is being updated.
        ></input>

        <label> Email </label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></input>

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></input>

        <label> Confirm Password </label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></input>

        <button type="submit"> Sign-Up </button>
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
