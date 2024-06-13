import express from "express";

import { loginUser, registerUser } from "../controllers/user.controller";
import { handleValidationError, loginValidation, registerValidation } from "../middlewares/validation.middleware";
const router = express.Router()

router.post('/register',
   registerValidation,
   handleValidationError,
   registerUser)

router.post('/login',
    loginValidation,
    handleValidationError,
    loginUser
)

export default router