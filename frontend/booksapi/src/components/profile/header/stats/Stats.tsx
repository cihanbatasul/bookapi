import { motion } from "framer-motion"
import StatsCard from "./StatsCard"
const Stats = () => {
  return (
    
    <motion.div className="flex flex-row  h-full w-full justify-between align-middle p-3 md:p-6 lg:p-12">
      <StatsCard stat="200" title="Read"/>
      <StatsCard stat="30" title="Plan To Read"/>
      <StatsCard stat="23" title="Favorites"/>
    </motion.div>
  )
}

export default Stats