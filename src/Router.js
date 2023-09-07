import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import RoutesSpinner from "./Components/Spinners/RoutesSpinner"
import NotFound from "./Components/NotFound/NotFound"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import useAuthContext from "./Hooks/AuthContextHook";
const UserRouter = lazy(() => import("./Pages/User/UserRouter"))
const AdminLogin = lazy(() => import("./Pages/Admin/Login/Login"))
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome/AdminHome"))


const Router = () => {
  const [theme, colorMode] = useMode();
  const { state } = useAuthContext();
  return (
    <Suspense fallback={<RoutesSpinner />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AdminHome />
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route path="/*" element={<UserRouter />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
export default Router