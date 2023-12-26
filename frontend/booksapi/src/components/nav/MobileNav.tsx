import { motion } from "framer-motion"
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'
import { FC, useState } from "react"
import { Link } from "react-router-dom"


interface props {
  onPopup: () => void
}

const MobileNav: FC<props> = ({ ...props }) => {

  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const handleMenuClick = () => {
    setOpenMobileMenu(!openMobileMenu)
    props.onPopup()
  }

  return (

    <motion.div className="sticky top-0 flex flex-row justify-between  bg-background items-center p-4 shadow-md z-50">
      <motion.div>
        <Link to="/"><img className="h-12" src={logo} alt="site logo" /></Link>
      </motion.div>


      <motion.div onClick={handleMenuClick}>
        {openMobileMenu ?
          <img className="h-10" src={close} alt="menu close button " />
          :
          <img className="h-10" src={menu} alt="menu button " />
        }
      </motion.div>
    </motion.div>
  )
}

export default MobileNav