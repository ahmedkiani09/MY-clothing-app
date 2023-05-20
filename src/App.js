import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import Home from "./routes/home/home.routeComponent";
import NavigationBar from "./routes/navigationBar/navigationBar.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.componet";
import { checkUserSession } from "./store/user/user-action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
