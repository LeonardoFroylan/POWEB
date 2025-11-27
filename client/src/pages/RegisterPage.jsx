// import {useForm} from "react-hook-form";
// import {useAuth} from "../context/AuthContext.jsx";
// import { useEffect} from "react";
// import {useNavigate} from "react-router-dom";
// import {registerRequest} from "../api/auth.js";

// function RegisterPage (){
//     const {register, handleSubmit, formState: {errors}} = useForm();
//     const {signup, isAuthenticated} = useAuth();
//     const navigate = useNavigate();
    
//     useEffect(() =>{
//         if(isAuthenticated) navigate("/tasks");
//     }, [isAuthenticated]);

//     const onSubmit = handleSubmit(async (values) =>{
//         await signup(values);
//     });


//     return(<div className="bg-zinc-800 max-w-md p-10 rounded-md">
//         {   
//                 errors.map((error, index) => (
//                     <div key={index} className="bg-red-500 p-2 text-white text-center mb-2">
//                         {error}
//                     </div>
//                 ))
            
//             }

//         <form onSubmit={onSubmit}>
            
            
            
            
//             <input type="text"
//                 {...register("name",{required:true})}
//                     className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
//                 placeholder="Nombre de usuario"
//                 ></input> 

//                 {errors.name && <p className="text-red-500">El nombre del usuario es requerido </p>}

//              <input type="text"
//                 {...register("email",{required:true})}
//                     className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
//                 placeholder="Correo Electronico"
//                 ></input> 
//                 {errors.email && <p className="text-red-500">El correo electronico es requerido </p>}

//             <input type="text"
//                 {...register("password",{required:true})}
//                     className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
//                 placeholder="Password"
//                 ></input>  
//                 {errors.password && <p className="text-red-500">La contraseña es requerida </p>}
//                 <button type="submit">Registrar</button>    
//         </form>




//     </div>)
// }
// export default RegisterPage;
import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.jsx";
import { useEffect} from "react";
import {useNavigate} from "react-router-dom";


function RegisterPage (){
    // **1. Errores de Formulario** (OBJETO - Renombrado a formErrors)
    const {register, handleSubmit, formState: {errors: formErrors}} = useForm();
    
    // **2. Errores del Contexto/API** (ARRAY - Renombrado a registerErrors)
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    
    const navigate = useNavigate();
    
    useEffect(() =>{
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) =>{
        await signup(values);
    });
    return(<div className="bg-zinc-800 max-w-md p-10 rounded-md">
        
        {   
            // Usa registerErrors (el ARRAY) para mapear
            registerErrors.map((error, index) => (
                <div key={index} className="bg-red-500 p-2 text-white text-center mb-2">
                    {error}
                </div>
            ))
            
        }

        <form onSubmit={onSubmit}>
            
            {/* Input Nombre */}
            <input type="text"
                {...register("name",{required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Nombre de usuario"
            ></input> 
            {/* Usa formErrors (el OBJETO) para la validación local */}
            {formErrors.name && <p className="text-red-500">El nombre del usuario es requerido </p>}

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
            
            <button type="submit">Registrar</button>    
        </form>

    </div>)
}
export default RegisterPage;