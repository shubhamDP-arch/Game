import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth"
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast"

const Logout = () => {

    const {LogoutUser} = useAuth()

    useEffect(() => {
        LogoutUser()
    }, [])

    return <Navigate to="/login"/>

}

export default Logout