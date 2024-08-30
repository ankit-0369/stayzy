import React from "react"
import Header from "../components/Header"

import Footer from "../components/Footer"
// import SearchBar from "../components/SearchBar"

interface Props{
  children: React.ReactNode
}
const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen  '>
      <Header/>
      {/* <div className="mx-auto container mt-10">
        <SearchBar />
      </div> */}
      <div className=" mx-auto py-10 flex-1 mt-10">{children}</div>
      <Footer/>

    </div>
  )
}

export default Layout
