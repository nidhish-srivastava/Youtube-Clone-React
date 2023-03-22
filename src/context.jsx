import React, { useContext, useState } from "react";

const YtContext = React.createContext()

export const useYtContextHook = () =>{
    return useContext(YtContext)
}

export const YtContextProvider = ({children}) =>{
    const [searchInput,setSearchInput] = useState("")
    const [searchState,setSearchState] = useState(false)
    const searchHandler = (inp) =>{
        setSearchInput(inp)
    }
    return(
        <YtContext.Provider value={{searchInput,setSearchInput,searchHandler,searchState,setSearchState}}>
            {children}
        </YtContext.Provider>
    )
}