import React from "react";
import LoginForm from "./User/LoginForm";
import AboutUs from "./Components/aboutUs";
import Carousel from "./Components/carousel";

function LandingPage({ token }) {
  return (
    <div>
      <div>
        <LoginForm token={token} />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <Carousel />
      </div>
    </div>
  );
}

export default LandingPage;
