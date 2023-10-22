import { AnimatePresence, motion } from "framer-motion"
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'
import darkmode from '../../assets/darkmode.png'
import lightmode from '../../assets/lightmode.png'
import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useDispatch } from "react-redux"
import { setDesignMode } from "../../store/designReducer"
interface props {
  onPopup: () => void
}

const MobileNav: FC<props> = ({onPopup}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const handleMenuClick = () => {
    setOpenMobileMenu(!openMobileMenu)
    onPopup()
  }
  const darkMode = useSelector((state: RootState) => state.designer.darkMode )

  const dispatch = useDispatch()
  useEffect(() => {
    const htmlElement  = document.documentElement

    if (darkMode) {
      if(htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark')
      }
      if (!htmlElement.classList.contains('light')) {
        htmlElement.classList.add('light')
      }
    }

    if(!darkMode) {
      if(htmlElement.classList.contains('light')) {
        htmlElement.classList.remove('light')
      }
      if (!htmlElement.classList.contains('darl')) {
        htmlElement.classList.add('dark')
      }
    }
  }, [darkMode]) 

  const handleDesignMode = () => {
    dispatch(setDesignMode(!darkMode))
  }
  return (

    <motion.div className="sticky top-0 flex flex-row justify-between  bg-white dark:bg-gray-900 items-center p-4 shadow-md z-50">
      <motion.div>
      <Link to="/"><img className="h-12" src={logo} alt="site logo"/></Link>
      </motion.div>
      <motion.div onClick={handleDesignMode}>
      <motion.img 
      whileHover={{ scale: 1.5}}
      className="h-8 cursor-pointer dark:bg-white dark:rounded-full dark:backdrop-blur-sm dark:bg-white/70 " src={darkMode ? lightmode : darkmode}/>
    </motion.div>
      <motion.div  onClick={handleMenuClick}>
      {openMobileMenu ? 
        <img className="h-10" src={close}  alt="menu close button "/>
        :
        <img className="h-10" src={menu}  alt="menu button "/>
      }
      </motion.div>
    </motion.div>
    )
}

export default MobileNav