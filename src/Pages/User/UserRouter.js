import React from "react";
import { lazy } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../../Hooks/AuthContextHook";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Orders } from "./Profile/Components/Orders/Orders";
import { Profile } from "./Profile/Profile";
import { BookedMemberships } from "./Profile/Components/BookedMemberships/BookedMemberships";
import { BookedEatSmart } from "./Profile/Components/BookedEatSmart/BookedEatSmart";
const Home = lazy(() => import("./Home/Home"))
const Memberships = lazy(() => import("./Memberships/Memberships"))
const VIPMemberships = lazy(() => import("./Memberships/VIPMemberships/VIPMemberships"))
const Instructors = lazy(() => import('./Instructors/Instructors'))
const EatSmart = lazy(() => import('./EatSmart/EatSmart'))
const Shop = lazy(() => import('./Shop/Shop'))
const Cart = lazy(() => import("./Shop/Cart/Cart"))
const ProductDetails = lazy(() => import('./Shop/ProductDetails/ProductDetails'))
const UserSignUp = lazy(() => import("./SignUp/SignUp"))
const VerifyMsg = lazy(() => import("./SignUp/VerifyMsg"))
const VerifyEmailCode = lazy(() => import("./VerifyEmail/VerifyEmailCode"))
const UserLogin = lazy(() => import("./Login/Login"))
const ContactUs = lazy(() => import('./ContactUs/ContactUs'))
const NotFound = lazy(() => import("../../Components/NotFound/NotFound"))

const UserRouter = () => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  // const handleRouting = ( route , id )=>{
  const handleRouting = (func, previousUrl) => {
    if (state.userRole === "users") {
      // navigate(`${route}/${id}`)
      func()
    } else {
      toast.warning('Please Login First !')
      setTimeout(() => {
        navigate('/login', {
          state: {
            previousUrl
          }
        })
      }, 3000)
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home handleRouting={handleRouting} />} />
        <Route path="/home" element={<Home handleRouting={handleRouting} />} />
        <Route path="/plans-pricing/gym-membership" element={<Memberships handleRouting={handleRouting} />} />
        <Route path="/plans-pricing/private-training" element={<VIPMemberships handleRouting={handleRouting} />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="eat-smart" element={<EatSmart handleRouting={handleRouting} />} />
        <Route path="apparel" element={<Shop handleRouting={handleRouting} />} />
        <Route path="apparel/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={<Cart handleRouting={handleRouting} />}
        />
        <Route
          path="profile"
          element={<Profile />}
        >
          <Route path='orders' element={<Orders handleRouting={handleRouting} />}/>
          <Route path='booked-memberships' element={<BookedMemberships handleRouting={handleRouting} />}/>
          <Route path='booked-eat-smart' element={<BookedEatSmart handleRouting={handleRouting} />}/>
        </Route>
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
