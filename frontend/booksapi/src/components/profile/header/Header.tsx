import { motion } from "framer-motion"

import Stats from "./stats/Stats"
import UserIcon from "./UserIcon"

const Header = () => {
  return (
    <motion.div className="flex flex-col justify-center items-center p-3 md:p-6 lg:p-12 gap-4 shadow-md">
      <UserIcon img="test"/>
      <motion.span className="text-2xl">My Name</motion.span>
      <motion.span className="text-justify text-sm md:text-base lg:text-base">About Me: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quas quae esse quisquam illum dolores cumque nesciunt, natus odio molestiae inventore eos molestias ut asperiores fuga tempora totam assumenda! Maiores.</motion.span>
      <Stats/>
    </motion.div>
    )
}

export default Header