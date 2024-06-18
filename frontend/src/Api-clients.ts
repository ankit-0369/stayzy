import { SignInFormData } from "./components/SignIn";
import { FormData } from "./components/Signup";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || ""
export const register= async (registerData:FormData)=>{
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