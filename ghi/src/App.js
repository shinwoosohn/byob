import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./User/Signup";
import "./App.css";
import LoginForm from "./User/LoginForm";
import TopNavBar from "./Components/topNavBar";
import PostsList from "./Posts/postsList";
import { useGetTokenQuery } from "./store/authApi";
import AuthProvider from "./utils/AuthProvider";
import ProduceForm from "./Produce/produceForm";
import Footer from "./Components/footer";
import LandingPage from "./LandingPage";

function App() {
  const { data } = useGetTokenQuery();

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  if (data === undefined) {
    return null;
  }

  return (
    <BrowserRouter basename={basename}>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route element={<AuthProvider token={data} />}>
          <Route path="users">
            <Route path=":user_id">
              {/* <Route index element={<ProfileDetail />} /> */}
              <Route path="produce">
                {/* <Route index element={<ProduceList />} /> */}
                <Route path="new" element={<ProduceForm />} />
                {/* <Route path=":produce_id" element={<ProduceDetail />} /> */}
              </Route>
            </Route>
          </Route>
          <Route path="posts">
            <Route index element={<PostsList />} />
            {/* <Route path="new" element={<PostsForm />} /> */}
            {/* <Route path=":posts_id" element={<PostsDetail />} /> */}
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
