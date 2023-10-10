import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutesSpinner from "./Components/Spinners/RoutesSpinner";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import useAuthContext from "./Hooks/AuthContextHook";
const UserLogin = lazy(()=>import("./Pages/User/Login/Login"));
const EditorLogin = lazy(()=>import ("./Pages/Editor/Login/Login"));
const UserRouter = lazy(() => import("./Pages/User/UserRouter"));
const AdminLogin = lazy(() => import("./Pages/Admin/Login/Login"));
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome/AdminHome"));

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
              state.userRole === "admins" ? (
                <Navigate to="/admin" />
              ) : state.userRole === "editors" ? (
                <Navigate to="/editors" />
              ) : (
                <Navigate to="/" />
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
        <Route
          path="/editors/login"
          element={
            state.userRole ? (
              state.userRole === "editors" ? (
                <Navigate to="/editors" />
              ) : state.userRole === "admins" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <EditorLogin />
            )
          }
        />
        <Route
          path="/editors/*"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {state.userRole === "editors" ? (
                  <AdminHome />
                ) : (
                  <Navigate to="/editors/login" />
                )}
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="/*"
          element={
            state.userRole ? (
              state.userRole === "admins" ? (
                <Navigate to="/admin" />
              ) : state.userRole === "editors" ? (
                <Navigate to="/editors" />
              ) : (
                <UserRouter />
              )
            ) : (
              <UserRouter />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};
export default Router;
