import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Home from '../views/Home'

import NoMatch from "@/views/NoMatch"
import BookView from "../views/BookView"
import UserProfile from "../views/UserProfile"
import Login from "../views/Login"
import UserForm from "../views/UserForm"
import Libraries from "@/components/profile/Browse/header/Libraries"

const AnimatedRoutes = () => {

    const location = useLocation()


    return (

        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />

                <Route path="/book/:id" element={<BookView />} />
                <Route path="/profile" element={<UserProfile activeComponent="browse" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserForm />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AnimatePresence>


    )
}

export default AnimatedRoutes