import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema} from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";
import { login, register, logout, profile } from "../controllers/auth.controller.js"; 

const router = Router();
router.post('/login',login);
router.post('/register',validateSchema(registerSchema),register);
router.post('/logout',logout);
router.get('/profile',authRequired,profile);
export default router;