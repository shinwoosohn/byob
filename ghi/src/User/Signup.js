import React, { useState } from "react";
import landingPageImg from "../Assets/landingPageImg.png";
import byobLogo from "../Assets/byobLogo.png";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store/authApi";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [signup, result] = useSignupMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      city: city,
      state: state,
      username: username,
      password: password,
      avatar_url: avatarUrl,
    });
    event.target.reset();
  };

  if (result.isSuccess) {
    navigate("/login");
  }

  return (
    <div className="w-full h-screen bg-byob-cyan pt-16">
      <div className="max-w-[1440px] m-auto grid grid-cols-3">
        <div>
          <img src={byobLogo} className="pb-20 w-full" />
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First Name"
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last Name"
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  required
                  type="text"
                  name="email"
                  id="email"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  placeholder="Phone Number"
                  required
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="Address"
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="City"
                  required
                  type="text"
                  name="city"
                  id="city"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  placeholder="State"
                  required
                  type="text"
                  name="state"
                  id="state"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="Username"
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                  type="text"
                  name="password"
                  id="password"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  value={avatarUrl}
                  placeholder="Avatar Url"
                  required
                  type="text"
                  name="avatarUrl"
                  id="avatarUrl"
                  className="form-control pl-2 py-2 justify-center"
                />
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Sign Up
            </button>
            <a
              className="inline-block align-baseline text-sm text-gray-500 hover:text-blue-800 pl-4"
              href="/login/"
            >
              Already have an account? Login here.
            </a>
          </form>
        </div>
        <img src={landingPageImg} className="w-full col-span-2 pt-48" />
      </div>
    </div>
  );
}

export default Signup;
