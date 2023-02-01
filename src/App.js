import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.routeComponent";
import NavigationBar from "./routes/navigationBar/navigationBar.component";
import SignIN from "./routes/signIn page/signIn.component";

const Shop = () => {
  return (
    <div>
      <h1> I am a shop component</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIN />} />
      </Route>
    </Routes>
  );
};

export default App;
