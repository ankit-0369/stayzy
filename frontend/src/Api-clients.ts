import { FormData } from "./components/Signup";

// const API_BASE_URL= import.meta.env.API_BASE_URL || ""
export const register= async (registerData:FormData)=>{

    const response= await fetch(`http://localhost:8080/api/users/register`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(registerData)
    })
    const responseBody= await response.json()
    if(!response.ok) throw new Error(`${responseBody.message} and custom message`)
        return responseBody;

}