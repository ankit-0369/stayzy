
import { useNavigate } from "react-router-dom"
import { SignIn } from "../components/SignIn"
import { useAppContext } from "../contexts/AppContext"
import { useEffect } from "react"


const SignInPage= ()=>{
        const {isLoggedIn}= useAppContext()
        const navigate= useNavigate()
       useEffect(()=>{
        if(isLoggedIn){
         
            console.log("loggedin")
            navigate('/')
        }
       }, [isLoggedIn, navigate])
    return (
        <div className="w-screen overflow-hidden">
            <SignIn/>
        </div>
    )
}

export default SignInPage