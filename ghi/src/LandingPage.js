import React from "react";
import LoginForm from "./User/LoginForm";
import AboutUs from "./Components/aboutUs";
import Carousel from "./Components/carousel";

function LandingPage() {
  return (
    <div>
      <div>
        <LoginForm />
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
