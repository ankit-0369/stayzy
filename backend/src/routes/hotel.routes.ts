import express from "express";
import { SearchHotel } from "../controllers/hotel.controller";
const router= express.Router()

router.get('/search', SearchHotel)

export default router;