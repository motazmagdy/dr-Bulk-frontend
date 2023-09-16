import React from "react";
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import useAuthContext from "../../Hooks/AuthContextHook";
import Cart from "./Shop/Cart/Cart";
import Memberships from "./Memberships/Memberships";
import PrivateTraining from "./PrivateTraining/PrivateTraining";
const UserSignUp = lazy(() => import("./SignUp/SignUp"))
const UserLogin = lazy(() => import("./Login/Login"))
const Home = lazy(() => import("./Home/Home"))
const Shop = lazy(() => import('./Shop/Shop'))
const ProductDetails = lazy(() => import('./Shop/ProductDetails/ProductDetails'))
const Instructors = lazy(() => import('./Instructors/Instructors'))
const EatSmart = lazy(() => import('./EatSmart/EatSmart'))
const ContactUs = lazy(() => import('./ContactUs/ContactUs'))

const UserRouter = () => {
  const { state } = useAuthContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans-pricing/gym-membership" element={<Memberships />} />
        <Route path="/plans-pricing/private-training" element={<PrivateTraining />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="eat-smart" element={<EatSmart />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={state.userRole === "users" ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="login"
          element={!state.userRole ? <UserLogin /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!state.userRole ? <UserSignUp /> : <Navigate to="/" />}
        />
        <Route path="contactus" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRouter;
