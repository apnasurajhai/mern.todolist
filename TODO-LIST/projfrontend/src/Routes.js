import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

export const infoContext = React.createContext();
const Routes = () => {
  const infoState = useState({
    username: "Suraj",
    password: "12345",
  });
  return (
    <infoContext.Provider value={infoState}>
      <Router>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Switch>
      </Router>
    </infoContext.Provider>
  );
};

export default Routes;
