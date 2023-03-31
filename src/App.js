import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { ourAuthStateChangedListener } from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user-action";

import Home from "./routes/home/home.routeComponent";
import NavigationBar from "./routes/navigationBar/navigationBar.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.componet";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = ourAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });
    return unSubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
