import { Request, Response } from "express"
import Hotel from "../models/hotel.model";
import { ApiResponse } from "../utils/apiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { HotelSearchResponse, HotelType } from "../shared/types";

const addNewHotel= async(req: Request, res: Response)=>{
    
    try {

        const imageFiles= req.files as Express.Multer.File[];
        if(!imageFiles){
            return res.status(401).json(
                new ApiResponse(401, 'images not found', {})
            );
        }
        const imageUrls= await uploadOnCloudinary(imageFiles)
        console.log(imageUrls)
        const newHotel: HotelType= req.body;
        newHotel.imageUrls= imageUrls;
        newHotel.lastUpdated= new Date();
        newHotel.userId= req.userId;
        const hotel= new Hotel(newHotel);
        
        await hotel.save();
        res.status(200).json(
            new ApiResponse(201, 'Hotel created!', {hotel: hotel})
        );
        
        /*
        1. get details of hotel from body. as we have checked all the validations before this using express-validator
       2. get images from body as multer added some new fields likes files in body.
       3. Store image on cloudinary and get imageUrls.
        4. Create new Hotel with details.
         5. Add imageUrls to the newHotel and add lastUpdate manually.
        6. save new Hotel in DB.
        7. Return 201 status with createdHotel as object. 
        */
    } catch (error) {
        console.log('Error while creating New Hotel :: ', error)
        res.status(500).json(
            new ApiResponse(500, 'Internal server Error while creating new Hotel!!', {error})
        )
    }
}


const getAllHotels= async(req: Request, res: Response)=>{
    console.log("called")
    try {
        const allHotels= await Hotel.find({userId: req.userId})
        console.log(allHotels)
        // res.status(200).json(
        //     new ApiResponse(200, 'Hotel fetched successfully!', {
        //         hotels: allHotels
        //     })
        // )
        res.json(allHotels)
    } catch (error) {
        
        res.status(500).json(
            new ApiResponse(500, 'Internal server Error', {error: error})
        )
    }
}

const getHotelById= async(req: Request, res: Response)=>{

    try {
        const  id= req.params.id.toString();
        const hotel= await Hotel.findOne({
            _id: id,
            userId: req.userId
        })

        if(!hotel){
            res.status(404).json(
                new ApiResponse(404, 'Hotel with given id not found!', {

                })
            )
        }

        // res.status(200).json(new ApiResponse(200, 'hotel fetched!', {hotel}));
        res.status(200).json(hotel);
    } catch (error) {
        
        res.status(500).json(
            new ApiResponse(500, 'Internal server Error while fetching hotel!', {error})
        )
    }
}

const updateHotelById= async (req:Request, res: Response)=>{
    try {
        
        const updateHotel:HotelType= req.body;
        const hotel= await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId
        }, updateHotel, {new: true});
        if(!hotel){
            return res.status(404).json(new ApiResponse(
                404, 'Hotel Not Found!', {}
            ))
        }

        const files= req.files as Express.Multer.File[];
        const updatedUrls= await uploadOnCloudinary(files);
        hotel.imageUrls= [
            ...updatedUrls, 
            ...(hotel.imageUrls || [])
        ]

        await hotel.save();
        res.status(201).json(hotel);

    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, 'Server errro while updating the hotelById', {error})
        );
    }
}




export {
    addNewHotel,
    getAllHotels,
    getHotelById,
    updateHotelById,

}