import { motion } from "framer-motion"
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'
import { useState } from "react"

const MobileNav = () => {
  const [ isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (

    <motion.div className="sticky top-0 flex flex-row justify-between bg-darker items-center p-4">
      <motion.div>
        <img className="h-14" src={logo} alt="site logo"/>
      </motion.div>

      <motion.div onClick={handleMenuClick}>
      {isMenuOpen ? 
        <img src={close}  alt="menu close button"/>
        :
        <img src={menu}  alt="menu button"/>
      }
      </motion.div>
    </motion.div>
    )
}

export default MobileNav