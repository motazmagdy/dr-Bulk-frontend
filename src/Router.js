import { Suspense } from "react"
import { Routes , Route } from "react-router-dom"
import RoutesSpinner from "./Components/Spinners/RoutesSpinner"
import UserSignUp from "./Pages/User/SignUp/SignUp"
import UserLogin from "./Pages/User/Login/Login"
import AdminLogin from "./Pages/Admin/Login/Login"
import ChangePassword from "./Pages/Admin/ChangePassword/ChangePassword"
import AdminHome from "./Pages/Admin/AdminHome/AdminHome"
import UserHome from "./Pages/User/UserHome/UserHome"
import PlansPricing from './Pages/User/PlansPricing/PlansPricing'
import Instructors from './Pages/User/Instructors/Instructors'
import EatSmart from './Pages/User/EatSmart/EatSmart'
import Apparel from './Pages/User/Apparel/Apparel'
import ContactUs from './Pages/User/ContactUs/ContactUs'

const Router = ()=>{
    return (
        <Suspense fallback={<RoutesSpinner />}>
            <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="/users/login" element={<UserLogin />} />
                <Route path="/users/signup" element={<UserSignUp />} />
                <Route path="/users/home" element={<UserHome />} />
                <Route path="/admin/login" element={<AdminLogin /> }/>
                <Route path="/admin/change-password" element={<ChangePassword />}/>
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/users/plans-pricing" element={<PlansPricing />} />
                <Route path="/users/instructors" element={<Instructors />} />
                <Route path="/users/eat-smart" element={<EatSmart />} />
                <Route path="/users/apparel" element={<Apparel />} />
                <Route path="/users/contactus" element={<ContactUs />} />
            </Routes>
        </Suspense>
    )
} 
export default Router