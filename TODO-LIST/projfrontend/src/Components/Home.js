import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { infoContext } from "../Routes";
import Todos from "./Todos";
const Home = () => {
  const [info, setInfo] = useContext(infoContext);
  const logout = () => {
    setInfo(null);
  };
  return (
    <div>
      <h1>TODO-LIST APP </h1>
      <ul>
        <li>
          {!info && (
            <NavLink className="sign-in" to="/signup">
              Sign Up
            </NavLink>
          )}
        </li>
        <li>
          {!info && (
            <NavLink className="sign-in" to="/signin">
              Sign In
            </NavLink>
          )}
        </li>
        {info && <Todos />}
        {info && <button onClick={logout}>Logout</button>}
      </ul>
    </div>
  );
};

export default Home;
