import express from "express";
import { addNewHotel } from "../controllers/hotel.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { addNewHotelValidation } from "../middlewares/validation.middleware";
import upload from "../middlewares/multer.middleware";



const router = express.Router()

router.post('/', verifyToken,
    addNewHotelValidation,
    upload.array("imageFiles", 6),
    addNewHotel)

export default router;

/* 
 Adding new Hotel
 1. declare a route.
 2. Need to verify the token for authenticating the end-point.
 3. Need to add validation in the fields coming from frontend using express-validator
 4. Need to use multer as middleware for storing the images in db.
 5. create addNewHotel controller.
*/