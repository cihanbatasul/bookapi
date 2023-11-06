import { motion } from "framer-motion"
import logo from '../../assets/logo.png'

import { Link } from "react-router-dom"

import ThemeToggle from "./ThemeToggle"
import SignUpButton from "../ui/SignUpButton"
import UserDropDown from "../ui/UserDropDown"

type Props = {
  onLogout: () => void
  isUserLoggedIn: boolean
}

const Nav = (props: Props) => {


  return (
    <motion.div className="sticky bg-background top-0 flex flex-row justify-between  items-center p-10 text-[#374151] dark:text-white z-50 shadow-md">
      <motion.div>
        <Link to="/"><img className="h-10" src={logo} alt="site logo" /></Link>
      </motion.div>

      <motion.div className="flex flex-row gap-4  items-center">
        <Link to={'/'} className="hover:text-blue-600">Home</Link>
        {!props.isUserLoggedIn ? <motion.div>
          <motion.div className="flex flex-row items-center">
            <Link to={'/user'}  >
              <SignUpButton />
            </Link>
            <ThemeToggle />
          </motion.div>
        </motion.div> : <motion.div>
          <motion.div className="flex flex-row items-center">
            <UserDropDown signoutOnClick={props.onLogout} />
            <ThemeToggle />
          </motion.div>
        </motion.div>
        }
      </motion.div>



    </motion.div>

  )
}

export default Nav