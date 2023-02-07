import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { CartDropdownContext } from "../../context/cart-dropdown.context";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.componet";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import "./navigationBar.styles.scss";

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartDropdownContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop now
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
