import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./User/Signup";
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import "./App.css";
import LoginForm from "./User/LoginForm";
import TopNavBar from "./Components/topNavBar";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  return (
    <BrowserRouter>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <ErrorNotification error={error} />
    //   <Construct info={launch_info} />
    // </div>
  );
}

export default App;
