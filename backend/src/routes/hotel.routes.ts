import express from "express";
import { getHotelById, SearchHotel } from "../controllers/hotel.controller";
import { param } from "express-validator";

const router = express.Router()

router.get('/search', SearchHotel);

router.get('/:id',
    [param("id").notEmpty().withMessage("Hotel Id is required")],
    getHotelById);
    

export default router;