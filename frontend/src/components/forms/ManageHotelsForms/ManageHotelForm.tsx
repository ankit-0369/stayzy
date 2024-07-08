import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { Button } from "../../Button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../../../backend/src/shared/types";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList; //need to see
    imageUrls: string[];
    adultCount: number;
    childCount: number;
  };

  type Props= {
    onSave: (hotelformData : FormData)=> void;
    isLoading: boolean;
    hotel?: HotelType;
  }

const ManageHotelForm= ({onSave, isLoading, hotel}:Props)=>{
    const formMethods= useForm<HotelFormData>()
    const {handleSubmit, reset}= formMethods

    useEffect(()=>{
        reset(hotel)
    }, [reset, hotel])
    
    const {hotelId}= useParams()
    const onSubmit= handleSubmit((formdataJson:HotelFormData)=>{
        console.log(formdataJson);
        const formData= new FormData()
        if(hotelId){
          formData.append("hotelId", hotelId)
        }
        formData.append("name", formdataJson.name)
        formData.append("city", formdataJson.city)
        formData.append("country", formdataJson.country)
        formData.append("description", formdataJson.description)
        formData.append("type", formdataJson.type)
        formData.append("pricePerNight", formdataJson.pricePerNight.toString())
        formData.append("starRating", formdataJson.starRating.toString())
        formData.append("adultCount", formdataJson.adultCount.toString())
        formData.append("childCount", formdataJson.childCount.toString())

        formdataJson.facilities.forEach((facility, index)=> {
            formData.append(`facilities[${index}]`, facility)

        })
        Array.from(formdataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
          });

          if (formdataJson.imageUrls) {
            formdataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
            });
          }

        onSave(formData)          
    })


    return (
       <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
            <DetailsSection/>
            <TypeSection />
            <FacilitiesSection/>
            <GuestSection />
            <ImageSection/>
            <span className="flex justify-end">

            <Button
            disabled= {isLoading}
             label={isLoading ? "Saving..." : "Save"}
              type="submit" 
              classname={`text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500`}  />
            
            </span>
            
        </form>
       </FormProvider>
    )
}

export default ManageHotelForm;