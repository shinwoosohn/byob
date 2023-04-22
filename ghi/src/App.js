import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./User/Signup";
import "./App.css";
import LoginForm from "./User/LoginForm";
import TopNavBar from "./Components/topNavBar";
import PostsList from "./Posts/postsList";
import { useGetTokenQuery } from "./store/authApi";
import AuthProvider from "./utils/AuthProvider";

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
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route element={<AuthProvider token={data} />}>
          <Route path="/posts" element={<PostsList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
