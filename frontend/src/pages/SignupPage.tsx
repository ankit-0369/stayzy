import { useNavigate } from "react-router-dom"
import { SignUp } from "../components/Signup"
import { useAppContext } from "../contexts/AppContext"
import { useEffect } from "react"


const SignupPage = () => {
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
     {!isLoggedIn &&  <SignUp/>}
    </div>
  )
}

export default SignupPage
