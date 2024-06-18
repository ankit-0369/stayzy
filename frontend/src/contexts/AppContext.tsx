import React, { useContext, useState } from "react"
import Toast from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from "../Api-clients"
type ToastType= {
    tpye: "SUCCESS" | "ERROR",
    message: string
}

type AppContext= {
    showToast: (toast : ToastType)=> void,
    isLoggedIn: boolean,
    isLoading: boolean
}

const AppContext=  React.createContext<AppContext | undefined>(undefined);
export const AppContextProvider= ({children} : {children : React.ReactNode})=>{
    const {isError, isLoading}= useQuery("validateToken", apiClient.validateToken, {
        retry: false
    })

    const [toastMessage, setToastMessage]= useState<ToastType | undefined>(undefined)
    return (
       <AppContext.Provider value={{
        showToast: (toast)=> {
            console.log(toast)
            setToastMessage(toast)
        },
        isLoggedIn: !isError || false,
        isLoading: isLoading
       }}>
            {
                toastMessage && <Toast
                 message= {toastMessage.message}
                  type={toastMessage.tpye} 
                  onClose={()=> setToastMessage(undefined)}
                  />
            }
            {children}
       </AppContext.Provider>
    )
}

export const useAppContext= ()=>{

    const context= useContext(AppContext)
    return context as AppContext;
}