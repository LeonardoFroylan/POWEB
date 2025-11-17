import {z} from 'zod';
export const registerSchema = z.object({
    name: z.string({required_error: "El nombre es obligatorio"}),
    email: z.string({required_error: "El email es obligatorio"}).email("El email no es valido"),
    password: z.string({required_error: "La contraseña es obligatoria"}).min(6,"LA contraseña debe de medir almenos 6 caracteres")});

