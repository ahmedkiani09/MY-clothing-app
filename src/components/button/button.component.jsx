import "./button.styles";
import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType) => {
  let selectedButton;

  switch (buttonType) {
    case BUTTON_TYPE_CLASSES.base:
      selectedButton = BaseButton;
      break;
    case BUTTON_TYPE_CLASSES.google:
      selectedButton = GoogleButton;
      break;
    case BUTTON_TYPE_CLASSES.inverted:
      selectedButton = InvertedButton;
      break;
    default:
      selectedButton = BaseButton;
      break;
  }

  return selectedButton;
};

// const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
// ({
//   [BUTTON_TYPE_CLASSES.base]: BaseButton,
//   [BUTTON_TYPE_CLASSES.google]: googleButton,
//   [BUTTON_TYPE_CLASSES.inverted]: invertedButton,
// }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}> {children} </CustomButton>;
};

export default Button;
