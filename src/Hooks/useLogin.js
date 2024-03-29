import { useState } from "react";
import useAuthContext from "../Hooks/AuthContextHook";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const useLogin = () => {
  const { t } = useTranslation();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation()
  const previousUrl = location.state ? location.state.previousUrl.pathname : "/"

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");

  const login = (userData, role) => {
    axios
      .post(`${serverApi}/api/${role}/login`, userData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(t("Logged In Successfully ! "));
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("User_Role", role);
          localStorage.setItem("User_Name", userData.email);
          dispatch({
            type: "USER_LOGIN",
            payload: role,
            userName: userData.email,
          });
          setIsSubmitting(false);
          setLoginErrMsg(null);
          role === "admins" ? navigate(`/admin`) : role === "editors" ? navigate('/editors') : navigate(previousUrl)
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(t(err.response.data.message));
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(t(err.msg));
          });
        }
        setIsSubmitting(false);
        setLoginErrMsg(err.response.data.message);
      });
  };

  return { login, isSubmitting, setIsSubmitting, loginErrMsg };
};

export default useLogin;
