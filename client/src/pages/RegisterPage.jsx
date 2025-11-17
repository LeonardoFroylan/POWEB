import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.jsx";
import {use, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {registerRequest} from "../api/auth.js";

function RegisterPage (){
    const {register, handleSubmit} = useForm();
    const {signup, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() =>{
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) =>{
        await signup(values);
    });


    return(<div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit}>
            
            
            
            
            <input type="text"
                {...register("name",{required:true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Nombre de usuario"
                ></input> 
             <input type="text"
                {...register("email",{required:true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Correo Electronico"
                ></input>   
            <input type="text"
                {...register("password",{required:true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Password"
                ></input>  
                <button type="submit">Registrar</button>    
        </form>




    </div>)
}
export default RegisterPage;