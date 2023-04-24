import React from "react";
import { useState } from "react";
import { useLoginMutation } from "../store/authApi";
import landingPageImg from "../Assets/landingPageImg.png";
import byobLogo from "../Assets/byobLogo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({ username: username, password: password });
    event.target.reset();

    if (!response.hasOwnProperty("error")) {
      navigate("/posts");
    }
  };

  return (
    <div className="w-full h-screen bg-byob-cyan pt-16 rounded-b-[180px]">
      <div className="max-w-[1600px] m-auto grid grid-cols-3">
        <div>
          <img src={byobLogo} className="pb-20 w-full" />
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="form-control pl-2 py-2 justify-center"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control pl-2 py-2 justify-center"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline text-sm text-gray-500 hover:text-blue-800 pl-4"
              href="/signup"
            >
              Dont have an account? Sign up here.
            </a>
          </form>
          {result.isError && (
            <div className="text-red-500 mt-2">
              Username or password is invalid.
            </div>
          )}
        </div>
        <img src={landingPageImg} className="w-full col-span-2 pt-48" />
      </div>
    </div>
  );
};

export default LoginForm;
