import { motion } from "framer-motion"
import { FC } from "react"

interface props {
    title: string
    stat: string 
}

const StatsCard: FC<props> = ({...props}) => {
  return (
    <motion.div className=" flex flex-col gap-2 items-center">
        <motion.div className="text-lg shadow-sm">
    {props.title}
  </motion.div>
  <motion.div>
    {props.stat}
  </motion.div>
    </motion.div>

  )
}

export default StatsCard