import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/authApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, result] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username: username, password: password });
    event.target.reset();
  };
  // //   useEffect(() => {
  //     const checkIfLoggedIn = async () => {
  //       const response = await fetch("/api/accounts/login", {
  //         method: "GET",
  //       });
  //       if (result.isSuccess) {
  //         const { data } = await response.json();
  //         dispatch(login(data));
  //         setIsLoggedIn(true);
  //       } else {
  //         alert("Invalid username or password");
  //       }
  //     };
  //     checkIfLoggedIn();
  //   }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
