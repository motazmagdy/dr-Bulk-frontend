import { createContext , useReducer } from "react";

export const AuthContext = createContext()

export const authReducer= (state , action)=>{
    switch (action.type) {
        case 'USER_LOGIN' : 
        return { userRole : action.payload , userName : action.userName }
        case 'ADMIN_LOGIN' :
        return { userRole : action.payload , userName : action.userName }
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

    console.log("AuthContext State : " , state );

    return (
        <AuthContext.Provider value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}