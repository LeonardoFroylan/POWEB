import {createContext, useState, useContext} from "react";
import {registerRequest} from "../api/auth.js";

export const AuthContext = createContext();
export const useAuth = () => {
    console.log("useAuth called");
    const context= useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe usarse con AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const signup = async (user) =>{
    try {
    const res = await registerRequest(user);
    console.log(res);
    setUser(res.data);
    setIsAuthenticated(true);
    } catch (error) {
        console.log(error);
   }
}
   return (
    <AuthContext.Provider value = 
    {{
      signup, 
      user,
      isAuthenticated,
      }}>
        {children}
    </AuthContext.Provider>

   );
}