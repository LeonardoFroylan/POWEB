import {createContext, useState, useContext} from "react";
import {registerRequest} from "../api/auth.js";
import { useEffect } from "react";

export const AuthContext = createContext();
export const useAuth = () => {
    
    const context= useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe usarse con AuthProvider");
    }
    console.log("AuthContext:", context);
    return context;
}

export const AuthProvider = ({children}) =>{
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [errors, setErrors] = useState([]);
   
   useEffect(() =>{
    if(errors.length > 0){
        const timer = setTimeout(() =>{
            setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
    }
   }, [errors]);  

   const signup = async (user) =>{
    try {
    const res = await registerRequest(user);
    console.log(res);
    setUser(res.data);
    setIsAuthenticated(true);
    } catch (error) {
        console.log(error);
        setErrors(error.response.data);
   }
}
   return (
    <AuthContext.Provider value = 
    {{
      signup, 
      user,
      isAuthenticated,
      errors,
      }}>
        {children}
    </AuthContext.Provider>

   );
}

