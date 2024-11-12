import {createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [shopid, setShopid] = useState(localStorage.getItem("shopid"))
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const storeTokenInLS = (token) => {
        setToken(token)
        localStorage.setItem("token", token)
    }

    const storeShopIdInLS = (shopid) => {
        setShopid(shopid)
        localStorage.setItem("shopid", shopid)
    }

    const backapi = "http://localhost:5000"

    const LogoutUser = () => {
        setToken("")
        localStorage.removeItem("token")
        localStorage.removeItem("shopid")
    }
    

    return(
        <>
            <AuthContext.Provider value={{storeTokenInLS, token, shopid, LogoutUser, storeShopIdInLS}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    return authContextValue
}