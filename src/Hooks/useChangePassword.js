import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const useChangePassword = () => {

    const { t }= useTranslation();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [changePwErrMsg, setChangePwErrMsg] = useState("");

    const changePassword = (userData)=>{
        axios.post(`${serverApi}/api/admins/change-password`, userData
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            toast.success(t("Password Changed Successfully ! "))
            localStorage.setItem('Token', response.data.token)
            navigate('/admin')
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