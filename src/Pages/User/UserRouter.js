import React from "react";
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import useAuthContext from "../../Hooks/AuthContextHook";
const Home = lazy(() => import("./Home/Home"))
const Memberships = lazy(() => import("./Memberships/Memberships"))
const PrivateTraining = lazy(() => import("./PrivateTraining/PrivateTraining"))
const EatSmart = lazy(() => import('./EatSmart/EatSmart'))
const Instructors = lazy(() => import('./Instructors/Instructors'))
const UserSignUp = lazy(() => import("./SignUp/SignUp"))
const VerifyMsg = lazy(() => import("./SignUp/VerifyMsg"))
const VerifyEmailCode = lazy(() => import("./VerifyEmail/VerifyEmailCode"))
const UserLogin = lazy(() => import("./Login/Login"))
const Shop = lazy(() => import('./Shop/Shop'))
const Cart = lazy(() => import("./Shop/Cart/Cart"))
const ProductDetails = lazy(() => import('./Shop/ProductDetails/ProductDetails'))
const ContactUs = lazy(() => import('./ContactUs/ContactUs'))
const NotFound = lazy(() => import("../../Components/NotFound/NotFound"))

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
          path="signup"
          element={!state.userRole ? <UserSignUp /> : <Navigate to="/" />}
        />
        <Route path="verify-your-email" element={<VerifyMsg />} />
        <Route path="verify-email-code/:code/:id" element={<VerifyEmailCode />} />
        <Route
          path="login"
          element={!state.userRole ? <UserLogin /> : <Navigate to="/" />}
        />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRouter;
