import { Routes, Route, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import Home from '../views/Home'
import SearchPage from '../views/SearchPage'
import SearchResults from '../views/SearchResults'
import BookView from "../views/BookView"


const AnimatedRoutes = () => {

    const location = useLocation()



    return (

<AnimatePresence mode="wait">

<Routes location={location} key={location.pathname}>
    <Route path="/" element={<Home/>}/>
    <Route path="/search" element={<SearchPage/>}/>
    <Route path="/searchresults" element={<SearchResults/>}/>
    <Route path="/book/:id" element={<BookView/>}/>

</Routes>

</AnimatePresence>


    )
}

export default AnimatedRoutes