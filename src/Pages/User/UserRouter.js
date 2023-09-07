import React from "react";
import { lazy } from "react"
import { Routes, Route } from "react-router-dom";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
const UserSignUp = lazy(() => import("./SignUp/SignUp"))
const UserLogin = lazy(() => import("./Login/Login"))
const Home = lazy(() => import("./Home/Home"))
const Shop = lazy(() => import('./Shop/Shop'))
const ProductDetails = lazy(() => import('./Shop/ProductDetails/ProductDetails'))
const Instructors = lazy(() => import('./Instructors/Instructors'))
const EatSmart = lazy(() => import('./EatSmart/EatSmart'))
const ContactUs = lazy(() => import('./ContactUs/ContactUs'))


const UserRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="eat-smart" element={<EatSmart />} />
        <Route path="shop" element={<Shop />}>
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        {/* <Route path="shop/:id" element={<ProductDetails />} /> */}
        <Route path="contactus" element={<ContactUs />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRouter;
