import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import RoutesSpinner from "./Components/Spinners/RoutesSpinner"
import UserSignUp from "./Pages/User/SignUp/SignUp"
import UserLogin from "./Pages/User/Login/Login"
import AdminLogin from "./Pages/Admin/Login/Login"
import ChangePassword from "./Pages/Admin/ChangePassword/ChangePassword"
import AdminHome from "./Pages/Admin/AdminHome/AdminHome"
import Home from "./Pages/User/Home/Home"
import PlansPricing from './Pages/User/PlansPricing/PlansPricing'
import Instructors from './Pages/User/Instructors/Instructors'
import EatSmart from './Pages/User/EatSmart/EatSmart'
import Apparel from './Pages/User/Apparel/Apparel'
import ContactUs from './Pages/User/ContactUs/ContactUs'

const Router = () => {
    return (
        <Suspense fallback={<RoutesSpinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plans-pricing" element={<PlansPricing />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/eat-smart" element={<EatSmart />} />
                <Route path="/apparel" element={<Apparel />} />
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