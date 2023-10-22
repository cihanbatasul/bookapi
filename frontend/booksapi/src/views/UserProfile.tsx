import { motion } from "framer-motion"
import Profile from "../components/profile/Profile"

const UserProfile = () => {
  return (
    <motion.div className="min-h-screen ">
        <Profile/>
    </motion.div>
  )
}

export default UserProfile