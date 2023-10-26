import { Routes, Route, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import Home from '../views/Home'

import BookView from "../views/BookView"
import UserProfile from "../views/UserProfile"
import Login from "../views/Login"
import Register from "../views/UserForm"
import UserForm from "../views/UserForm"


const AnimatedRoutes = () => {

    const location = useLocation()



    return (

<AnimatePresence mode="wait">



<Routes location={location} key={location.pathname}>
    <Route path="/" element={<Home/>}/>

    <Route path="/book/:id" element={<BookView/>}/>
    <Route path="/profile" element={<UserProfile/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/user" element={<UserForm/>}/>

</Routes>
</AnimatePresence>


    )
}

export default AnimatedRoutes