import { motion } from "framer-motion"
import logo from '../../assets/logo.png'
import darkmode from '../../assets/darkmode.png'
import lightmode from '../../assets/lightmode.png'

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect } from "react"
import { setDesignMode } from "../../store/designReducer"

const Nav = () => {

  const darkMode = useSelector((state: RootState) => state.designer.darkMode )
  const dispatch = useDispatch()
  useEffect(() => {
    const htmlElement  = document.documentElement

    if (darkMode) {
      htmlElement.classList.remove('light')
      htmlElement.classList.add('dark')
    }

    if(!darkMode) {
      htmlElement.classList.remove('dark')
      htmlElement.classList.add('light')
    }
  }, [darkMode]) 


  const handleDesignMode = () => {
    dispatch(setDesignMode(!darkMode))
  }
  return (
    <motion.div className="sticky top-0 flex flex-row justify-between bg-white dark:bg-gray-900 items-center p-10 text-[#374151] dark:text-white z-50 shadow-md">
    <motion.div>
      <Link to="/"><img className="h-10" src={logo} alt="site logo"/></Link>
    </motion.div>

    <motion.div className="flex flex-row gap-4  items-center">
    <Link to={'/'} className="hover:text-blue-600">Home</Link>
    <Link to={'/search'} className="hover:text-blue-600" >Search</Link>
    <motion.div onClick={handleDesignMode}>
      <motion.img 
      whileHover={{ scale: 1.5}}
      className="h-8 cursor-pointer dark:bg-white dark:rounded-full dark:backdrop-blur-sm dark:bg-white/70 " src={darkMode ? lightmode : darkmode}/>
    </motion.div>
    </motion.div>
  </motion.div>

  )
}

export default Nav