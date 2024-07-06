import { body, check, validationResult } from "express-validator";
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

const addNewHotelValidation= [
    body("name").notEmpty().withMessage("name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),


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
    handleValidationError,
    addNewHotelValidation
}