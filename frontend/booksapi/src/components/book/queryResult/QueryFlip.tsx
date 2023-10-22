import { motion } from "framer-motion"
import { FC } from "react"
import {VolumeInfoWithImages } from "./interfaces"
import { useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/solid"
interface props {
  details: VolumeInfoWithImages
  onClick: (input: string) => void
}

const QueryFlip: FC<props> = ({ ...props }) => {
  const authors = props.details.query.volumeInfo.authors
    ? props.details.query.volumeInfo.authors.map((author) => (
        <motion.div key={author} className="author">
          {author}
        </motion.div>
      ))
    : null;

  const categories = props.details.query.volumeInfo.categories
    ? props.details.query.volumeInfo.categories.map((category) => (
        <motion.div key={category} className="category">
          {category}
        </motion.div>
      ))
    : null;

  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if(!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }


  return (
   <motion.div
   className="flip-card flex flex-col min-h-[520px] w-[370px] p-3 lg:p-12 shadow-lg overflow-y-scroll border border-gray-300 dark:border-none ">
        <motion.div className="flip-card-inner w-full h-full"
        initial={false}
        animate={{rotateY: isFlipped ? 180 : 360}}
        transition={{duration: 0.6, animationDirection: "normal"}}
        onAnimationComplete={() => setIsAnimating(false)}>
            
        {isFlipped ?  
        <motion.div   className={`flip-card-back bg-cover bg-[url('${props.details.imageLinks.large}')] flex  flex-col justify-center items-center relative`}
        >
            <motion.div
            whileHover={{scale: 1.2}}
            className=" cursor-pointer"  onClick={handleFlip}>
            <ArrowLeftIcon className="h-[50px]" />
            </motion.div>
            <motion.div className="mt-14 ">
            {props.details.query.volumeInfo.description ? props.details.query.volumeInfo.description : "Leider gibt es für dieses Buch keine Beschreibung." }
            </motion.div>  
        </motion.div> : 
        <motion.div className="flip-card-front w-full h-full flex flex-col gap-3">
            <motion.div>
        <img src={props.details.imageLinks.thumbnail}/>
      </motion.div>
      <motion.div>{props.details.query.volumeInfo.title}</motion.div>
      <motion.div className="flex flex-row gap-3 ">{authors}</motion.div>
      {categories && (
        <motion.div className="flex flex-row gap-3">{categories}</motion.div>
      )}

      <motion.div className="flex flex-col gap-3">
        {/* {props.volumeInfo.ISBN} */}
        <motion.div className="flex flex-row gap-3">
        <p>Veröffentlicht:</p>
        {props.details.query.volumeInfo.publishedDate}
        </motion.div>
        <motion.div className="flex flex-row gap-3">
        <p >Verlag:</p>
        {props.details.query.volumeInfo.publisher}
        </motion.div>
      </motion.div>
     <motion.div className="flex flex-col  lg:flex-row gap-3 justify-center items-center">
     <motion.div 
      onClick={() => props.onClick(props.details.query.id)}
      className=" bg-blue-700 hover:bg-blue-800  focus:bg-blue-700 rounded-md  p-2 text-center cursor-pointer m-auto md:m-0 lg:m-0 text-white w-full lg:w-28">
        Zum Buch
      </motion.div>
      <motion.div 
      className=" bg-blue-700 hover:bg-blue-800  focus:bg-blue-700 rounded-md p-2 text-center cursor-pointer  md:m-0 lg:m-0 text-white px-1 w-full lg:w-28 "
      onClick={handleFlip}
      >
        Beschreibung
      </motion.div> 
      </motion.div> 
            </motion.div>  }

        </motion.div>
   </motion.div>
  );
};

export default QueryFlip