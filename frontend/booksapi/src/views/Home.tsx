import { motion } from 'framer-motion'
import Hero from '../components/hero/Hero'

import SearchArea from '../components/searcharea/SearchArea'

const Home = () => {
   
  return (

    <motion.div className='home bg-white dark:bg-gray-900 text-[#79808c] '>
      <Hero/>
  <motion.div className='min-h-screen flex flex-col justify-center'>
      <SearchArea/>
  </motion.div>    
  </motion.div>
    )
}

export default Home