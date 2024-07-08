import { useMutation, useQuery } from "react-query"
import ManageHotelForm from "../components/forms/ManageHotelsForms/ManageHotelForm"
import * as apiClient from '../Api-clients'
import { useParams } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"

const EditHotel = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchHotelById",
        () => apiClient.fetchHotelById(hotelId || ''),
         {
        enabled: !!hotelId
    })

    const {showToast}= useAppContext()

    const {isLoading, mutate}= useMutation(apiClient.updateHotelById, {
        onError: ()=>{
            showToast({tpye: "ERROR", message: "Error while updating the hotel"})
        },
        onSuccess: ()=>{
            showToast({tpye: "SUCCESS", message: "Hotel updated successfully!"})
        }
    } )

    const handleSave= (hotelData: FormData)=>{
        mutate(hotelData)
    }

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}  />
    )
}

export default EditHotel