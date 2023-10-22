import './index.css'
import  AnimatedRoutes from './router/router'
import { BrowserRouter as Router } from 'react-router-dom'
import MobileNav from './components/nav/MobileNav'
import Nav from './components/nav/Nav'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Provider, useSelector } from 'react-redux'
import store, { RootState } from './store/store'
import MobilePopUp from './components/nav/MobilePopUp'


function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)
  const [isMobilePopup, setIsMobilePopup] = useState(false)

  useEffect(() => {

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 780)
  }
  
  window.addEventListener('resize', handleWindowResize)

  
  return () => (
    window.removeEventListener('resize', handleWindowResize)
  )
  }, [])

  const handlePopUp = () => {
    setIsMobilePopup(!isMobilePopup)
  }

  return (
<Provider store={store}>
  <Router>
  {isMobile ? <MobileNav onPopup={handlePopUp} />  : <Nav/> } 
  <AnimatePresence>
  {isMobilePopup && <MobilePopUp/>}
  </AnimatePresence>
   <AnimatedRoutes/>
   </Router>

   </Provider>

  )
}

export default App
