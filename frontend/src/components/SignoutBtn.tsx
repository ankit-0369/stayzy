import { useMutation, useQueryClient } from "react-query"
import { Button } from "./Button"
import * as apiClient from '../Api-clients'
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"
const SignoutBtn= () =>{

    const query= useQueryClient()
    const navigate= useNavigate()
    const { showToast}= useAppContext()
    const mutation= useMutation(apiClient.signOut, {
        onSuccess: async()=>{
            console.log("Signed Out Successfully");
            await query.invalidateQueries("validateToken");
            showToast({tpye: "SUCCESS", message: "Signed Out Successfully, will wait for u🥹"})
            navigate('/sign-in')
        },
        onError: (errors:Error)=> {
            console.log("Error in mutation", errors.message)
            showToast({tpye: "ERROR", message: "Error while signing out, its our fault!"})
        }
    })

    const handleClick= ()=>{
        mutation.mutate()
    }
    return (
       <span onClick={handleClick}>
         <Button label="Sign Out"/>
       </span>
    )
}

export default SignoutBtn