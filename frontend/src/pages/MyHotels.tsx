import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { BsBuilding, BsMap } from "react-icons/bs"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClients from '../Api-clients'


const MyHotels= ()=>{

    const {data : hotelData, isLoading}= useQuery("fetchMyHotel", apiClients.fetchMyHotel, {
        onError: ()=>{
            
        },
       
    })

    if(isLoading){
      return (
        <div className="w-screen h-screen flex justify-center items-center text-3xl text-black bg-slate-50">
        Fetching Hotel data...
    </div>
      )
    }

    if(!hotelData){
        return (
            <div className="w-screen h-screen flex justify-center items-center text-3xl text-black bg-slate-50">
                No Hotels Found!
            </div>
        )
    }

 
    return (
        <div className="space-y-5 mt-10 ml-10 mr-10 text-black" >
        <span className="flex justify-between">
          <h1 className="text-3xl font-bold">My Hotels</h1>
          <Link
            to="/add-hotels"
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          >
            Add Hotel
          </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
          {hotelData.map((hotel, index) => (
            <div
            key={index}
              data-testid="hotel-card"
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />$ {hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                >
                  View Details
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
}

export default MyHotels