import { motion } from 'framer-motion'
import Hero from '../components/hero/Hero'

import SearchArea from '../components/searcharea/SearchArea'

import { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'

const Home = () => {

  const dispatch: AppDispatch = useDispatch()




  return (

    <motion.div className='home  text-[#79808c] min-h-screen '>
      <Hero />
      <motion.div className='min-h-screen flex flex-col justify-center'>
        <SearchArea />
      </motion.div>
    </motion.div>
  )
}

export default Home