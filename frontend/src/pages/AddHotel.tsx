import { useMutation } from "react-query";
import ManageHotelForm from "../components/forms/ManageHotelsForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../Api-clients'

const AddHotel= ()=>{
  const {showToast}= useAppContext()
  const {mutate, isLoading}= useMutation(apiClient.addHotel, {
    onSuccess: ()=>{
      showToast({
        message: "Hotel added Successfully!",
        tpye: "SUCCESS"
      });
    },

    onError: ()=>{
        showToast({
          message: "Error while Adding hotel!",
          tpye: 'ERROR'
        })
    }
  })

  const handleSave= (hotelformData : FormData)=>{
      mutate(hotelformData);
  } 

  return  (
    <ManageHotelForm onSave= {handleSave} isLoading= {isLoading}/>
  )
}

export default AddHotel;