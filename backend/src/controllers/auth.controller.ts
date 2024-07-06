import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";

const validateToken= async(req: Request, res: Response )=>{
    res.status(200).json(
        new ApiResponse(201, 'token validated success',{userId: req.userId} )
    )
}

const logOut= async(req: Request, res: Response) =>{

    res.cookie("auth_token","", {
        expires: new Date(0)
    })

    res.send()
}

export {
    validateToken,
    logOut
}

/*
    1. validate Email with otp 
    2. otp send feature
*/