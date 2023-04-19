import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./User/Signup";
import "./App.css";
import LoginForm from "./User/LoginForm";
import TopNavBar from "./Components/topNavBar";
import PostsList from "./Posts/postsList";
import CreateProduceForm from "./Produce/CreateProduceForm";

function App() {
  return (
    <BrowserRouter>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/posts" element={<PostsList />}></Route>
        <Route path="/createproduce" element={<CreateProduceForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
