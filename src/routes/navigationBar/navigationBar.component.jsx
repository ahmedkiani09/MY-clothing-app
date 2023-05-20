import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrenUser } from "../../store/user/user-selector";

import { selectIsCartOpen } from "../../store/cart/cart-selector";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.componet";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  NavLinksContainer,
  NavLink,
  LogoContainer,
} from "./navigationBar.styles";
import { signOutStart } from "../../store/user/user-action";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrenUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/shop">Shop now</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
