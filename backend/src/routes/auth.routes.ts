import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { logOut, validateToken } from "../controllers/auth.controller";


// const validateToken= async(req: Request, res: Response) =>{
    

// }

const router= Router()

router.get('/validate-token', verifyToken, validateToken );
router.post('/logout', logOut);

export default router;