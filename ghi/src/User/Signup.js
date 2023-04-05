import React, { useState } from "react";

function Signup() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = {};
    // data.first_name = firstName;
    // data.last_name = lastName;
    // data.email = email;
    // data.phone_number = phoneNumber;
    // data.address = address;
    // data.city = city;
    // data.state = state;
    // data.username = username;
    // data.password = password;
    // data.avatar_url = avatarUrl;

    const userUrl = `${process.env.REACT_APP_BYOB_SERVICE_API_HOST}/users`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setCity("");
      setState("");
      setUsername("");
      setPassword("");
      setAvatarUrl("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Sign Up!</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="First Name"
                required
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Last Name"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="Phone Number"
                required
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control"
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder="State"
                required
                type="text"
                name="state"
                id="state"
                className="form-control"
              />
              <label htmlFor="state">State</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                required
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                type="text"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setAvatarUrl(e.target.value)}
                value={avatarUrl}
                placeholder="Avatar Url"
                required
                type="text"
                name="avatarUrl"
                id="avatarUrl"
                className="form-control"
              />
              <label htmlFor="avatarUrl">AvatarUrl</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
