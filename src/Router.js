import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import RoutesSpinner from "./Components/Spinners/RoutesSpinner"
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
        <Route
          path="/admin/login"
          element={
            state.userRole ? (
              state.userRole !== "admins" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {state.userRole === "admins" ? (
                  <AdminHome />
                ) : (
                  <Navigate to="/admin/login" />
                )}
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route path="/*" element={state.userRole !== "admins" ? <UserRouter /> : <Navigate to="/admin" />} />
      </Routes>
    </Suspense>
  );
}
export default Router