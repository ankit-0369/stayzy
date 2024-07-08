import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
    const { register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext<HotelFormData>()

    const existingImageUrls= watch("imageUrls");

    const handleDelete= (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    )=>{

        event.preventDefault();
        setValue("imageUrls", 
            existingImageUrls.filter( url => url!==imageUrl)
        );

    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-black mt-3">Images</h2>

            {
                existingImageUrls && (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 ">
                        {
                            existingImageUrls.map((url) => (
                                <div className="relative group  overflow-hidden">
                                    <img src= {url} alt="Hotel Image" className="object-cover min-h-full" />
                                    <button
                                    onClick={(event)=> handleDelete(event, url)}
                                     className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            
            <input
                type="file"
                multiple
                accept="image/*"
                className="w-full cursor-pointer text-gray-700 font-normal"
                {
                ...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength= imageFiles.length + (existingImageUrls?.length || 0);
                        if (totalLength == 0) {
                            return "Atleast One Image is required!";
                        }
                        if (totalLength > 6) {
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