import { createContext , useReducer , useEffect } from "react";

export const AuthContext = createContext()

export const authReducer= (state , action)=>{
    switch (action.type) {
        case 'USER_LOGIN' : 
        return { userRole : action.payload , userName : action.userName }
        // case 'ADMIN_LOGIN' :
        // return { userRole : action.payload , userName : action.userName }
        case 'LOGOUT' :
        return { userRole:null , userName:null }   
        default :
        return state
    }
  }

export const AuthContextProvider = ({ children })=>{

    const [state,dispatch] = useReducer(authReducer , {
        userRole:null,
        userName:null
    })

    useEffect(()=>{
        const loginState = localStorage.getItem("Token")
        if (loginState){
            const role = localStorage.getItem('User_Role')
            const theName = localStorage.getItem('User_Name')
            // if(role === "users"){
                dispatch({
                    type:'USER_LOGIN' ,
                    payload : role ,
                    userName : theName 
                })
            // } else if ( role === "admins" ) {
                // dispatch({
                    // type:'ADMIN_LOGIN' ,
                    // payload : role ,
                    // userName : theName }
                // ) 
            }
        // }
    } , [])

    console.log("AuthContext State : " , state );

    return (
        <AuthContext.Provider value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}