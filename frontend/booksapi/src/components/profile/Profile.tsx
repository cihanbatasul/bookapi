import { motion } from "framer-motion"
import Header from "./header/Header"
import Body from "./body/Body"
const Profile = () => {
  return (
    <motion.div className="min-h-screen bg-white dark:bg-gray-900 h-full w-full flex flex-col text-black dark:text-gray-400">
        <Header/>
        <Body/>
    </motion.div>
    )
}

export default Profile