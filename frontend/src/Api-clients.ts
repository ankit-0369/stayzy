import { FormData } from "./components/Signup";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || ""
export const register= async (registerData:FormData)=>{
    console.log(API_BASE_URL);
    const response= await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(registerData)
    })
    const responseBody= await response.json()
    if(!response.ok) throw new Error(`${responseBody.message}`)
        return responseBody;

}