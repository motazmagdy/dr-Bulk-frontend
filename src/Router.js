import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import RoutesSpinner from "./Components/Spinners/RoutesSpinner"

const UserSignUp = lazy(() => import("./Pages/User/SignUp/SignUp"))
const UserLogin = lazy(() => import("./Pages/User/Login/Login"))
const AdminLogin = lazy(() => import("./Pages/Admin/Login/Login"))
const ChangePassword = lazy(() => import("./Pages/Admin/ChangePassword/ChangePassword"))
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome/AdminHome"))
const Home = lazy(() => import("./Pages/User/Home/Home"))
const Shop = lazy(() => import('./Pages/User/Shop/Shop'))
const ProductDetails = lazy(() => import('./Pages/User/Shop/ProductDetails/ProductDetails'))
const Instructors = lazy(() => import('./Pages/User/Instructors/Instructors'))
const EatSmart = lazy(() => import('./Pages/User/EatSmart/EatSmart'))
const ContactUs = lazy(() => import('./Pages/User/ContactUs/ContactUs'))

const Router = () => {
    return (
        <Suspense fallback={<RoutesSpinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/eat-smart" element={<EatSmart />} />
                <Route path="/shop" element={<Shop />} >
                    <Route path="product-details/:id" element={<ProductDetails />} />
                </Route>
                <Route path="/contactus" element={<ContactUs />} />

                <Route path="/login" element={<UserLogin />} />
                <Route path="/signup" element={<UserSignUp />} />

                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/change-password" element={<ChangePassword />} />
            </Routes>
        </Suspense>
    )
}
export default Router