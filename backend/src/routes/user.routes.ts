import express, {Request, Response} from "express";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/apiResponse";
import jwt from 'jsonwebtoken'
const router= express.Router()

router.post('/register', async (req: Request, res: Response)=>{
  
     try {
           const {email, password, firstName, lastName}= req.body
           console.log(email, password, firstName, lastName)
           if(!(email && password && firstName && lastName)){
            throw new ApiError(401, 'All fields are required');
           }
           
           let user= await User.findOne({
            email: email
           })

           if(user){
            throw new ApiError(409,'User with this email already exist', []) 
            
           }

           user= new User(req.body)
           await user.save()

           const token= jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d"}
           )

           const options= {
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
             {user: user, token: token}
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

})

export default router