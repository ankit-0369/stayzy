// import { HotelFormData } from "./components/forms/ManageHotelsForms/ManageHotelForm";
import { HotelType } from "../../backend/src/shared/types";
import { SignInFormData } from "./components/SignIn";
import { SignupFormData } from "./components/Signup";



const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || ""

/*

-------------------------------Authenticaiton API CALLS--------------------------------------------
----------------------------------------------------------------------------------------------------

*/
export const register= async (registerData:SignupFormData)=>{
    console.log(API_BASE_URL);
    const response= await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
            
        },
        body: JSON.stringify(registerData)
    })
    const responseBody= await response.json()
    if(!response.ok) throw new Error(`${responseBody.message}`)
        return responseBody;

}

export const signIn= async(signInData:SignInFormData) =>{

    const response= await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(signInData)
    })

    const responseBody= await response.json()
    console.log("response from signIn :: ",responseBody)
    if(!response.ok)
        throw new Error(responseBody.message)
    return responseBody;
}

export const validateToken= async() =>{
    const response= await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        }
    })

    if(!response.ok) throw new Error("Invalid Token");

    return response.json();
}


export const signOut= async()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    // const responseBody= await response.json()
    if(!response.ok)
        throw new Error("Error in signout")


}


/*

-------------------------------Hotel ADD and MANAGE API CALLS--------------------------------------------
----------------------------------------------------------------------------------------------------

*/


export const addHotel = async(hotelFormData : FormData)=>{
    const response= await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        credentials: "include",
        method: "POST",
        body: hotelFormData
    })

    if(!response.ok)
        throw new Error("Error while adding new Hotel")

    return response.json();
}

export const fetchMyHotel = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };


export const fetchHotelById= async (id : string): Promise<HotelType> =>{

    const response= await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
        credentials: "include"
    })

    if(!response.ok){
        throw new Error('Error while fetching the hotel!')
    }

    return response.json();
}

export const updateHotelById= async(hotelFormData : FormData)=>{
    const response= await fetch( `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData
    })

    if(!response.ok){
        throw new Error('Error in updating the hotel')
    }
    return response.json();
}