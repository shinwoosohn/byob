import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./User/Signup";
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import "./App.css";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_BYOB_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <ErrorNotification error={error} />
    //   <Construct info={launch_info} />
    // </div>
  );
}

export default App;
