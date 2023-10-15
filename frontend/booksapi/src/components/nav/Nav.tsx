import { motion } from "framer-motion"
import logo from '../../assets/logo.png'


import { Link } from "react-router-dom"

const Nav = () => {


  return (
    <motion.div className="sticky top-0 flex flex-row justify-between bg-darker items-center p-4 text-black z-50">
    <motion.div>
      <img className="h-14" src={logo} alt="site logo"/>
    </motion.div>

    <motion.div className="flex flex-row gap-4">
    <Link to={'/'}>Home</Link>
    <Link to={'/search'}>Search</Link>

    </motion.div>
  </motion.div>

  )
}

export default Nav