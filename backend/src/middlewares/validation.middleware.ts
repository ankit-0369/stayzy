import { check, validationResult } from "express-validator";
import { ApiResponse } from "../utils/apiResponse";
import {NextFunction, Request, Response} from 'express'
const registerValidation=  [
    check("firstName", "First Name is required").isString().escape(),
    check("lastName", "Last Name is required").isString().escape(),
    check("email", "Email is required").isEmail().escape(),
    check("password", "Password should be min of 6 length").isLength({
        min: 6
    }).escape()
]

const loginValidation= [
    check("email", "Email is required").isEmail().escape(),
    check("password", "Password should be min of 6 length").isLength({
        min: 6
    }).escape()
]

const handleValidationError= (req: Request, res : Response, next: NextFunction)=>{
    const error = validationResult(req)
    if (!error.isEmpty())
        return res.status(400).json(new ApiResponse(
            400, 
            'validation failed',
             error.array()
            )
        )

        next()
}



export {
    registerValidation,
    loginValidation,
    handleValidationError
}