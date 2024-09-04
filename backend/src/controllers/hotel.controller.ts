import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";
import { ApiResponse } from "../utils/apiResponse";
import { validationResult } from "express-validator";


const SearchHotel = async (req: Request, res: Response) => {

    console.log("called");
    // try {

    //     const pageSize= 5;
    //     const pageNumber= parseInt(req.query.page?.toString() || "1");
    //     const skip= (pageNumber -1)*pageSize;

    //     const hotel= await Hotel.find().skip(skip).limit(pageSize);
    //     const total= await Hotel.countDocuments();
    //     const response: HotelSearchResponse= {
    //         data: hotel,
    //         pagination: {
    //             total: total,
    //             page: pageNumber,
    //             pages: Math.ceil(total/pageSize),
    //         }
    //     }
    // res.status(200).json(
    //     new ApiResponse(
    //         201,
    //         'Hotel fetched success!',
    //         response
    //     )
    // )



    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(
    //         new ApiResponse(500, 'Internal server while searching the hotel', {error})
    //     )
    // }

    try {

        console.log("queries :: ", req.query);
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        const total = await Hotel.countDocuments(query);
        console.log(total);
        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(
            new ApiResponse(
                201,
                'Hotel fetched success!',
                response
            )
        )
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars);

        constructedQuery.starRating = { $in: starRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};

const getHotelById = async (req: Request, res: Response) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: "Hotel id required for fetching details" });
    }

    const hotelId = req.params.id.toString();
    try {

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {

            res.status(404).json(
                new ApiResponse(404, 'Hotel not found for this id', {
                    hotelId
                })
            )
        }

        return res.status(201)
            .json(new ApiResponse(201, 'Hotel fetched success', { hotel }));

    } catch (error) {
        console.log("getHotelById error backend error::", error);
        res.status(500).json(
            new ApiResponse(500, 'Something went wrong', {})
        );
    }

}


export {
    SearchHotel,
    getHotelById
}