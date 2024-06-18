import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "../utils/apiResponse";
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global{
    namespace Express{
        interface Request{
            userId: string
        }
    }
}

const verifyToken= (req: Request, res: Response, next: NextFunction)=>{

    const token= req.cookies["auth_token"];
    console.log(token); 
    if(!token) 
        return res.status(401).json(
    new ApiResponse(401, 'Invalid credentials', {}));

 try {
       const decodedToken= jwt.verify(token, process.env.JWT_SECRET_KEY as string);
       req.userId= (decodedToken as JwtPayload).userId;
       next();
 } catch (error) {
    console.log("Error while token verification",error);
    res.status(401).json(
        new ApiResponse(401, 'Invalid token', {error: error})
    )
 }



}

export {
    verifyToken
}