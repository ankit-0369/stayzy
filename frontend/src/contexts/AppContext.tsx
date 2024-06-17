import React, { useContext, useState } from "react"
import Toast from "../components/Toast"

type ToastType= {
    tpye: "SUCCESS" | "ERROR",
    message: string
}

type AppContext= {
    showToast: (toast : ToastType)=> void
}

const AppContext=  React.createContext<AppContext | undefined>(undefined);
export const AppContextProvider= ({children} : {children : React.ReactNode})=>{

    const [toastMessage, setToastMessage]= useState<ToastType | undefined>(undefined)
    return (
       <AppContext.Provider value={{
        showToast: (toast)=> {
            console.log(toast)
            setToastMessage(toast)
        },
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