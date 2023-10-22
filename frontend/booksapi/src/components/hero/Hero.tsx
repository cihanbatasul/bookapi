
import {motion} from "framer-motion"



import styles from '../../static/styles'

import Guy from '../../assets/hero.jpg'

const Hero = () => {

  return (

    <motion.div className="hero flex flex-col items-center  justify-center  text-justify md:text-center lg:text-center p-3 md:p-6 lg:p-10 gap-6 h-screen md:h-full lg:h-full">
     <motion.div className="flex flex-col justify-center md:flex-col lg:flex-row items-center p-3 gap-6  ">

     <motion.div className="flex flex-col gap-3 items-center ">
     <motion.div className={styles.title + 'title'}>
      <motion.span className="text-blue-500 ">
      Explore</motion.span> and <motion.span className="text-blue-500 ">discover</motion.span> books.
      </motion.div>
      <motion.div className=" ">
      Welcome to my books api website. This site was built using the Google Books API. Feel free to search for books and add them to your library to get recommendations.
      </motion.div>
      </motion.div>

    <img className="w-full " src={Guy} />
     </motion.div>
     
      
</motion.div>
    )
}

export default Hero