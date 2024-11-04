// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignUp";
import SubmitPage from "./components/SubmitForm";
import SignInPage from "./components/SignIn";
import Profilepage from "./components/Profile.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </Router>
  );
};

export default App;
