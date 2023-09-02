import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import UserSignUp from "./SignUp/SignUp";
import UserLogin from "./Login/Login";
import Home from "./Home/Home";
import PlansPricing from "./PlansPricing/PlansPricing";
import Instructors from "./Instructors/Instructors";
import EatSmart from "./EatSmart/EatSmart";
import Apparel from "./Apparel/Apparel";
import ContactUs from "./ContactUs/ContactUs";

const UserRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plans-pricing" element={<PlansPricing />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/eat-smart" element={<EatSmart />} />
        <Route path="/apparel" element={<Apparel />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRouter;
