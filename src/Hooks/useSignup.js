import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const useSignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupErrMsg, setSignupErrMsg] = useState("");

  const signup = (userData) => {
    axios
      .post(`${serverApi}/api/users/signup`, userData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(t("Signed Up Successfully ! "));
          setIsSubmitting(false);

          navigate('/verify-your-email')
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
        setSignupErrMsg(err.response.data.message);
        setIsSubmitting(false);
      });
  };

  return { signup, isSubmitting, signupErrMsg, setIsSubmitting };
};

export default useSignup;
