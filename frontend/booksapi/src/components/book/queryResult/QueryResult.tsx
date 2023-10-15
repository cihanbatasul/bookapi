import { motion } from "framer-motion";
import { FC } from "react";
import { VolumeInfo, Query } from "./interfaces";



const QueryResult: FC<Query> = ({ ...props }) => {
  const authors = props.volumeInfo.authors
    ? props.volumeInfo.authors.map((author) => (
        <motion.div key={author} className="author">
          {author}
        </motion.div>
      ))
    : null;

  const categories = props.volumeInfo.categories
    ? props.volumeInfo.categories.map((category) => (
        <motion.div key={category} className="category">
          {category}
        </motion.div>
      ))
    : null;

  return (
    <motion.div 
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 0.7}}
    key={props.id} className="flex flex-col p-3 gap-3">
      <motion.div>{props.volumeInfo.title}</motion.div>
      <motion.div className="flex flex-row gap-3 flex-wrap">{authors}</motion.div>
      {categories && (
        <motion.div className="flex flex-row gap-3">{categories}</motion.div>
      )}
      <motion.div>{props.volumeInfo.description}</motion.div>
      <motion.div className="flex flex-col gap-3">
        {/* {props.volumeInfo.ISBN} */}
        <motion.div className="flex flex-row gap-3">
        <p>Veröffentlicht:</p>
        {props.volumeInfo.publishedDate}
        </motion.div>
        <motion.div className="flex flex-row gap-3">
        <p >Verlag:</p>
        {props.volumeInfo.publisher}
        </motion.div>
      </motion.div>
      <motion.div 
      onClick={() => props.onClick(props.id)}
      className="bg-lightGreen dark:hover:bg-green-900  focus:bg-green-900 rounded-md w-28 p-2 text-center cursor-pointer m-auto md:m-0 lg:m-0">
        Zum Buch
      </motion.div>
    </motion.div>
  );
};

export default QueryResult;