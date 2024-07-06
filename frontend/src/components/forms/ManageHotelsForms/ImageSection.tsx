import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
    const { register,
        formState: { errors }
    } = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-black mt-3">Images</h2>
            <input
                type="file"
                multiple
                accept="image/*"
                className="w-full cursor-pointer text-gray-700 font-normal"
                {
                ...register("imageFiles", {
                    validate: (imageFiles) => {
                        if (imageFiles.length == 0) {
                            return "Atleast One Image is required!";
                        }
                        if (imageFiles && imageFiles.length > 6) {
                            return "selected images should be less than 6."
                        }
                        return true;
                    }
                })
                }
            />

            {
                errors.imageFiles && <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles?.message}
                </span>
            }
        </div>
    )
}

export default ImageSection;