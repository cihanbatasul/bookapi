import { motion, AnimatePresence } from "framer-motion"
import BookList from "./BookList"



const Body = () => {
  return (
    <motion.div className="h-full w-full overflow-x-clip flex ">
        <AnimatePresence mode="wait">
            <motion.div className="mx-auto mt-16">
            <BookList />
            </motion.div>
        </AnimatePresence>

    </motion.div>
  )
}

export default Body