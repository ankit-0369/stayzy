import { validationResult } from "express-validator"
import { Request, Response } from 'express'
import { ApiError } from "../utils/apiError"
import { User } from "../models/user.model"
import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/apiResponse"
import bcrypt from 'bcryptjs'
const registerUser = async (req: Request, res: Response) => {
   
    try {
        const { email, password, firstName, lastName } = req.body
        console.log(email, password, firstName, lastName)
        if (!(email && password && firstName && lastName)) {
            throw new ApiError(401, 'All fields are required');
        }

        let user = await User.findOne({
            email: email
        })

        if (user) {
            // throw new ApiError(409, 'User with this email already exist')
            return res.status(409).json(
                new ApiResponse(409, 'user with this email already exist',{})
            ) 

        }

        user = new User(req.body)
        await user.save()

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        )

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 86400000
        }

        res
            .status(200)
            .cookie("auth_token", token, options)
            .json(new
                ApiResponse(201,
                    'user created successfully',
                    { user: user, token: token }
                )
            )


    } catch (error) {
        console.log("Error while registering the user", error);

        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                message: error.message,
                errors: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
                errors: []
            });
        }

    }

}

const loginUser= async (req : Request, res: Response) => {
    try {
        const {email, password}= req.body;
        console.log(email, password)
        if(!email || !password)
        {
            throw new ApiError(401, "Email and Password are required");
            
        }

        const user= await User.findOne({email})
        if(!user){
            return res.status(409).json(
                new ApiResponse(409, 'Invalid Credentials with email', {})
                // new ApiError(401, "Invalid Credentials given!")
            )
        }

        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(400).json(
                new ApiResponse(400, 'Invalid Credentials', {}))

        const token= jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d"}
        )

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        .status(200)
        .json(
            new ApiResponse(200, 'User Signed In successfully', {userId: user._id})
        )
        



    } catch (error) {
        console.log(error)
        res.status(500).json(
            new ApiResponse(500, 'Internal server Error', error)
        )
    }
    
}

export {
    registerUser,
    loginUser
}


/*
  1. GetUser route
  2. change password
  4. change details
  5. take details from the user
  6. 
*/