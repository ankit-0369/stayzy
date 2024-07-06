
import { useFormContext } from 'react-hook-form';
import {hotelFacilities} from '../../../config/hotel-options-config'
import { HotelFormData } from './ManageHotelForm';
import { Input } from '../../ui/input';


const FacilitiesSection= ()=>{
    const {register,
        formState: {errors}
    }= useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 mt-3 text-black">Facilities</h2>
            <div className="grid grid-cols-2  md:grid-cols-5 gap-3">
            {
                hotelFacilities.map((facility, index) =>(
                    <label key={index} className='text-sm flex gap-1 text-gray-700 items-center '>
                        <Input
                        type='checkbox'
                        className='w-5 h-5'
                        value={facility}
                        {...register("facilities", {
                            validate: (facilities) => {
                              if (facilities && facilities.length > 0) {
                                return true;
                              } else {
                                return "At least one facility is required";
                              }
                            },
                          })}
                        />
                        {facility}
                    </label>
                ))
            }

            {
                errors.facilities && (
                    <span className="text-red-500 text-sm font-bold">
                      {errors.facilities.message}
                    </span>
                  )
            }
            </div>
        </div>
    )
}

export default FacilitiesSection;