import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useAuthContext from './AuthContextHook';
import { toast } from "react-toastify";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const useChangePassword = () => {
    const { state} = useAuthContext()
    const { t }= useTranslation();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [changePwErrMsg, setChangePwErrMsg] = useState("");

    const changePassword = (userData)=>{
      const reqRole = state.userRole ==="admins" ? "admins" : "editors"
        axios.post(`${serverApi}/api/${reqRole}/change-password`, userData
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            toast.success(t("Password Changed Successfully ! "))
            localStorage.setItem('Token', response.data.newToken)
            reqRole ==="admins" ? navigate('/admin') : navigate('/editors')
            setIsSubmitting(false)
            setChangePwErrMsg(null)
          }
        })
        .catch(err => {
          toast.error(t(err.response.data.message))
          setIsSubmitting(false)
          setChangePwErrMsg(err.response.data.message)
        })
    }

    return { changePassword , isSubmitting , setIsSubmitting , changePwErrMsg }
};

export default useChangePassword;