import './index.css'
import  AnimatedRoutes from './router/router'
import { BrowserRouter as Router } from 'react-router-dom'
import MobileNav from './components/nav/MobileNav'
import Nav from './components/nav/Nav'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 780)
  }
  
  window.addEventListener('resize', handleWindowResize)

  return () => (
    window.removeEventListener('resize', handleWindowResize)
  )
  }, [])

  

  return (
    <motion.div className='w-full h-full'>
<Provider store={store}>
  <Router>
    {isMobile ? <MobileNav/>  : <Nav/> }   
   <AnimatedRoutes/>
   </Router>
   </Provider>
   </motion.div>

  )
}

export default App
