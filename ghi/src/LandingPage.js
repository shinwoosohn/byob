import React from "react";
import LoginForm from "./User/LoginForm";
import AboutUs from "./Components/aboutUs";

function LandingPage() {
  return (
    <div>
      <div>
        <LoginForm />
      </div>
      <div>
        <AboutUs />
      </div>
    </div>
  );
}

export default LandingPage;
