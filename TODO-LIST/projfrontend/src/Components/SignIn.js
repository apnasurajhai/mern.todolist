import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../backend";
import { infoContext } from "../Routes";
export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();

    throw Error(message);
  }
  return response.json();
};
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setInfo] = useContext(infoContext);

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/signin", {
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
      <h1>Sign In Here!</h1>
      {error}
      <form onSubmit={login}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
