import useAuthContext  from '../Hooks/AuthContextHook';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

const useLogout = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const { t } = useTranslation()

    const logout = ()=>{
        localStorage.removeItem("Token");
        localStorage.removeItem("Role");
        dispatch({
          type : "LOGOUT" 
        })
        toast.success(t("Logged Out Successfully ! "))
        navigate("/users/home");
        console.log("logout success");
    }

    return { logout }
};

export default useLogout;