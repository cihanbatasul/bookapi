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
    <motion.div key={props.id} className="flex flex-col p-3">
      <motion.div>{props.volumeInfo.title}</motion.div>
      <motion.div className="flex flex-row gap-3">{authors}</motion.div>
      {categories && (
        <motion.div className="flex flex-row gap-3">{categories}</motion.div>
      )}
      <motion.div>{props.volumeInfo.description}</motion.div>
      <motion.div className="flex flex-row gap-3">
        {props.volumeInfo.ISBN}
        {props.volumeInfo.publishedDate}
        {props.volumeInfo.publisher}
      </motion.div>
    </motion.div>
  );
};

export default QueryResult;