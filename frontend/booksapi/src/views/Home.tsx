import { motion } from 'framer-motion'
import Hero from '../components/hero/Hero'

const Home = () => {
  return (

    <motion.div className='home bg-light text-black'>
      <Hero/>  
    </motion.div>
    )
}

export default Home