import { Link } from "react-router-dom"
import { Button } from "./Button"
import { useAppContext } from "../contexts/AppContext"
import SignoutBtn from "./SignoutBtn"


const Header = () => {

  const { isLoggedIn } = useAppContext()


  return (
    <div className='bg-[#111111] py-4 border-b-zinc-800 border-b fixed  top-0 right-0 z-50 w-full '>
      <div className="px-10 mx-auto flex justify-between  ">

        <div>
          <span className="text-3xl text-white font-bold tracking-wide">
            <Link to="/">StayZy</Link>
          </span>
        </div>
        <div className="flex gap-2 items-center justify-center">
          {
            isLoggedIn ? 
            <>
            <Button label="My Bookings" href="/my-bookings" />
            <Button label="My Hotels" href="/my-hotels" />
            <Button label="Add Hotels" href="/add-hotels" />

            <SignoutBtn />
            </> : <>
              <Button
                label="Sign In"
                href="/sign-in"
              />

              <Button label="Sign Up" href="/sign-up" />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
