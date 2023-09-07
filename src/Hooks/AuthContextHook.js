import  { useContext } from "react";

import { AuthContext } from "../Context/AuthContext";

const useAuthContext = () => {

    const context = useContext(AuthContext)

    if ( !context ){
        throw new Error("AuthContextHook should be called inside AuthContext ")}

    return context
}
export default useAuthContext;