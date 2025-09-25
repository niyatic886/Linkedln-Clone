import React, { useState, useEffect } from "react";

import LoginPage from "./Pages/LoginPage";
import Navbar1 from "./Components/Navbar1";
import Footer1 from "./Components/Footer1";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Navbar2 from "./Components/Navbar2";
import Feeds from "./Pages/Feeds";
import MyNetwork from "./Pages/MyNetwork";
import Resume from "./Pages/Resume";
import Message from "./Pages/Message";
import Profile from "./Pages/Profile";
import Activity from "./Pages/Activity";
import SingleActivity from "./Pages/SingleActivity";
import Notification from "./Pages/Notification";

import axios from "axios";


function App() {
  const location = useLocation();


  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

  const changeLoginValue = (val) => {
    setIsLogin(val);
  }


  // useEffect(() => {
  //   fetchData();
  // }, []);


  const excludedPages = ["/", "/signIn", "/signUp"];

  const showNavbar1 = !isLogin || excludedPages.includes(location.pathname);
  const showNavbar2 = isLogin && !excludedPages.includes(location.pathname);


  return (
    <div>
      {showNavbar2 && <Navbar2 />}
      {showNavbar1 && <Navbar1 />}

      <Routes>
        <Route path="/" element={isLogin ? <Navigate to={"/feeds"} /> : <LoginPage changeLoginValue={changeLoginValue} />} />
        <Route path="/signUp" element={isLogin ? <Navigate to={"/feeds"} /> : <SignUp changeLoginValue={changeLoginValue} />} />
        <Route path="/signIn" element={isLogin ? <Navigate to={"/feeds"} /> : <SignIn changeLoginValue={changeLoginValue} />} />
        <Route path="/feeds" element={isLogin ? <Feeds /> : <Navigate to={"/signIn"} />} />
        <Route path="/mynetwork" element={isLogin ? <MyNetwork /> : <Navigate to={"/signIn"} />} />
        <Route path="/resume" element={isLogin ? <Resume /> : <Navigate to={"/signIn"} />} />
        <Route path="/message" element={isLogin ? <Message /> : <Navigate to={"/signIn"} />} />
        <Route path="/notification" element={isLogin ? <Notification /> : <Navigate to={"/signIn"} />} />
        <Route path="/profile/:id" element={isLogin ? <Profile /> : <Navigate to={"/signIn"} />} />
        <Route path="/profile/:id/activity" element={isLogin ? <Activity /> : <Navigate to={"/signIn"} />} />
        <Route path="/profile/:id/activity/:postId" element={isLogin ? <SingleActivity /> : <Navigate to={"/signIn"} />} />
      </Routes>

      <Footer1 />
    </div>
  );
}

export default App;
