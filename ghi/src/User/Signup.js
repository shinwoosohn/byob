import React, { useState } from "react";
import landingPageImg from "../Assets/landingPageImg.png";
import byobLogo from "../Assets/byobLogo.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../store/authApi";
import { useUpdateDriversMutation } from "../store/usersApi";
import { useSelector } from "react-redux";

function Signup({ user_id }) {
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
  const [carModel, setCarModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [dlNumber, setDlNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signup] = useSignupMutation();
  const data = useSelector((state) => state.auth.user);
  const [driversignup] = useUpdateDriversMutation({ user_id, data });
  const [login] = useLoginMutation();

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

    const response = await login({ username: username, password: password });
    if (!response.hasOwnProperty("error")) {
      setIsModalOpen(true);
    }
  };

  const handleUserToDriverSubmit = async (event) => {
    console.log("--------------------------------------------");
    event.preventDefault();
    const response = await driversignup({
      user_id: data.user_id,
      data: {
        car_model: carModel,
        license_plate: licensePlate,
        dl_number: dlNumber,
      },
    });
    if (!response.hasOwnProperty("error")) {
      setIsModalOpen(false);
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen bg-byob-cyan pt-16">
      <div className="max-w-[1440px] m-auto grid grid-cols-3">
        <div>
          <img src={byobLogo} className="pb-20 w-full" alt="" />
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
              href="/"
            >
              Already have an account? Login here.
            </a>
          </form>
          {isModalOpen && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Would you like to sign up as a driver?
                      </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <input
                        onChange={(e) => setCarModel(e.target.value)}
                        value={carModel}
                        placeholder="Car Model"
                        required
                        type="text"
                        name="carModel"
                        id="carModel"
                        className="form-control pl-2 py-2 justify-center pr-2"
                      />
                      <input
                        onChange={(e) => setLicensePlate(e.target.value)}
                        value={licensePlate}
                        placeholder="License Plate"
                        required
                        type="text"
                        name="licensePlate"
                        id="licensePlate"
                        className="form-control pl-2 py-2 justify-center pr-2"
                      />
                      <input
                        onChange={(e) => setDlNumber(e.target.value)}
                        value={dlNumber}
                        placeholder="Driver License #"
                        required
                        type="text"
                        name="dlNumber"
                        id="dlNumber"
                        className="form-control pl-2 py-2 justify-center pr-2"
                      />
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        type="button"
                        onClick={handleUserToDriverSubmit}
                      >
                        YES
                      </button>
                      <a
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        href="/"
                      >
                        NO
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </div>
        <img src={landingPageImg} className="w-full col-span-2 pt-48" alt="" />
      </div>
    </div>
  );
}

export default Signup;
