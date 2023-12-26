import { useState, useEffect, Dispatch, SetStateAction } from "react"
import Nav from "./Nav"
import MobileNav from "./MobileNav"

import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setToken, logoutUser as logOutUserReducer } from "@/store/userReducer"
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shadcncomponents/ui/use-toast"
type Props = {
    isMobile: boolean
    isMobilePopUp: boolean
    setIsMobile: Dispatch<React.SetStateAction<boolean>>
    setIsMobilePopUp: Dispatch<React.SetStateAction<boolean>>
}

const NavWrapper = (props: Props) => {

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const getJwtFromCookie = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        return cookieValue;
    };


    const token = getJwtFromCookie()

    useEffect(() => {
        if (token) {
            dispatch(setToken(token))
        }
    }, [])

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const redToken = useSelector((state: RootState) => state.user.token)
    
    const { toast } = useToast()

    const logoutUser = async () => {
        dispatch(logOutUserReducer())
        navigate("/") 
        toast({
          variant: "default",
          title: "Success Logging Out",
          description: "You've been logged out successfully!",
          })
    }

    useEffect(() => {
        const handleWindowResize = () => {
            props.setIsMobile(window.innerWidth <= 780)
        }
        window.addEventListener('resize', handleWindowResize)

        return () => (
            window.removeEventListener('resize', handleWindowResize)
        )
    }, [])

    const handlePopUp = () => {
        props.setIsMobilePopUp(!props.isMobilePopUp)
    }

    return (
        <div className="sticky top-0 z-50">
            {props.isMobile ? <MobileNav onPopup={handlePopUp} /> : <Nav onLogout={logoutUser} isUserLoggedIn={isUserLoggedIn} />}
        </div>
    )
}
export default NavWrapper
