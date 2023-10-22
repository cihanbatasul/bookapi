import { motion } from "framer-motion"
import { FC } from "react"
import {VolumeInfoWithImages } from "./interfaces"
import { useState } from "react"

interface props {
  details: VolumeInfoWithImages
  onClick: (input: string) => void
}

const QueryResult: FC<props> = ({ ...props }) => {
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
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 0.7}}
    onClick={handleFlip}
    key={props.details.query.id} className="flip-card flex flex-col p-3 lg:p-12 gap-3 shadow-lg hover:scale-105  min-h-[520px] max-h-[520px]">
      <motion.div 
      initial={false}
      animate={{rotateY: isFlipped ? 180 : 360}}
      transition={{duration: 0.6, animationDirection: "normal"}}
      onAnimationComplete={() => setIsAnimating(false)}
      className="flip-card-inner w-full h-full">

      <motion.div className="flip-card-front">
      <motion.div>
        <img src={props.details.imageLinks.thumbnail}/>
      </motion.div>
      <motion.div>{props.details.query.volumeInfo.title}</motion.div>
      <motion.div className="flex flex-row gap-3 ">{authors}</motion.div>
      {categories && (
        <motion.div className="flex flex-row gap-3">{categories}</motion.div>
      )}
      <motion.div className="max-h-[270] overflow-scroll py-1">{props.details.query.volumeInfo.description}</motion.div>
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
      <motion.div 
      onClick={() => props.onClick(props.details.query.id)}
      className=" bg-blue-700 hover:bg-blue-800  focus:bg-blue-700 rounded-md w-28 p-2 text-center cursor-pointer m-auto md:m-0 lg:m-0 text-white">
        Zum Buch
      </motion.div>
      </motion.div>

      <motion.div className={`flip-card-back bg-cover bg-[url('${props.details.imageLinks.thumbnail}')]`}>
        <motion.div>
          {props.details.query.volumeInfo.description}
        </motion.div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QueryResult;