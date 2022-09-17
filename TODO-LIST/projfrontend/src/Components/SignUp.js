import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../backend";
import { infoContext } from "../Routes";
import { handleErrors } from "./SignIn";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setInfo] = useContext(infoContext);

  const signup = (e) => {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setInfo({
          username,
          password,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const navigate = useNavigate();
  return (
    <div>
      <h1>SignUp Here!</h1>
      {error}
      <form onSubmit={signup}>
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        ></input>
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
