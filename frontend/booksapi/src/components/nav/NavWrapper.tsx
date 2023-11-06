import { useState, useEffect, Dispatch, SetStateAction } from "react"
import Nav from "./Nav"
import MobileNav from "./MobileNav"

import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setToken, logoutUser as logOutUserReducer } from "@/store/userReducer"

import { useToast } from "@/shadcncomponents/ui/use-toast"
type Props = {
    isMobile: boolean
    isMobilePopUp: boolean
    setIsMobile: Dispatch<React.SetStateAction<boolean>>
    setIsMobilePopUp: Dispatch<React.SetStateAction<boolean>>
}

const NavWrapper = (props: Props) => {



    const dispatch: AppDispatch = useDispatch()

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


    const { toast } = useToast()

    const logoutUser = async () => {
        const apiURL = "http://localhost:5000/logout"

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${getJwtFromCookie()}`
                }
            });

            if (response.ok) {
                dispatch(logOutUserReducer())
                toast({
                    variant: "default",
                    title: "Success Logging Out",
                    description: "You've been logged out successfully!",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Problem Logging Out",
                    description: "There was a problem logging you out. Please try again or contact the staff",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Problem Logging Out",
                description: "2There was a problem logging you out. Please try again or contact the staff",
            })
        }
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

    useEffect(() => {
        console.log(props.isMobile)
    }, [props.isMobile])
    return (
        <div>
            {props.isMobile ? <MobileNav onPopup={handlePopUp} /> : <Nav onLogout={logoutUser} isUserLoggedIn={isUserLoggedIn} />}
        </div>
    )
}
export default NavWrapper