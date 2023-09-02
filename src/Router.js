import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Pages/Admin/Login/Login";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import useAuthContext from "./Hooks/AuthContextHook";
import UserRouter from "./Pages/User/UserRouter";

const Router = () => {
  const [theme, colorMode] = useMode();
  const { state } = useAuthContext();
  console.log(state);
  return (
    <>
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
      </Routes>
    </>
  );
};
export default Router;
