import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.jsx";
// import { useEffect} from "react";
import {useNavigate} from "react-router-dom";


function LoginPage (){
    // **1. Errores de Formulario** (OBJETO - Renombrado a formErrors)
    const {register, handleSubmit, formState: {errors: formErrors}} = useForm();
    
    // **2. Errores del Contexto/API** (ARRAY - Renombrado a registerErrors)
    const {signin,errors: signinErrors} = useAuth();
    
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) =>{
        await signin(values);
    });
    return(<div className="bg-zinc-800 max-w-md p-10 rounded-md">
        
        { 
            // Usa registerErrors (el ARRAY) para mapear
            signinErrors.map((error, index) => (
                <div key={index} className="bg-red-500 p-2 text-white text-center mb-2">
                    {error}
                </div>
            ))
            
        }

        <form onSubmit={onSubmit}>
            
            {/* Input Email */}
            <input type="email" // Cambiado a type="email" es mejor
                {...register("email",{required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Correo Electronico"
            ></input> 
            {formErrors.email && <p className="text-red-500">El correo electronico es requerido </p>}

            {/* Input Password */}
            <input type="password" // Cambiado a type="password" para ocultar la entrada
                {...register("password",{required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Password"
            ></input> 
            {formErrors.password && <p className="text-red-500">La contraseña es requerida </p>}
            
            <button type="submit">Inicisr Sesion</button> 
        </form>

    </div>)
}
export default LoginPage;