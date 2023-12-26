import { motion } from "framer-motion"
import { FC } from "react"
import { VolumeInfoWithImages } from "./interfaces"
import { useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { ScrollArea } from "@/shadcncomponents/ui/scroll-area"

type Props = {
  details: VolumeInfoWithImages
  onClick: (input: string) => void
}

const QueryFlip = (props: Props) => {
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


  return ( <motion.div className="w-full h-full  col-span-full md:col-span-1 md:row-span-1  flex flex-col gap-3 items-center text-center pt-3">
      <motion.div>
        <img src={props.details.imageLinks.thumbnail} />
      </motion.div>
      <motion.div className="text-xl">{props.details.query.volumeInfo.title}</motion.div>
      <motion.div className="flex flex-row gap-3 ">{authors}</motion.div>
      {categories && (
        <motion.div className="flex flex-row gap-3">{categories}</motion.div>
      )}

      <motion.div className="flex flex-col gap-3">
        {/* {props.volumeInfo.ISBN} */}
        <motion.div className="flex flex-row gap-3">
          <p className="font-bold">Veröffentlicht:</p>
          {props.details.query.volumeInfo.publishedDate}
        </motion.div>
        <motion.div className="flex flex-row gap-3">
          <p className="font-bold">Verlag:</p>
          {props.details.query.volumeInfo.publisher}
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-col  lg:flex-row gap-3 justify-center items-center ">
        <motion.div
          onClick={() => props.onClick(props.details.query.id)}
          className=" bg-blue-700 hover:bg-blue-800  focus:bg-blue-700 rounded-md  p-2 text-center cursor-pointer m-auto md:m-0 lg:m-0 text-white w-full lg:w-28  ">
          Zum Buch
        </motion.div>

      </motion.div>
    </motion.div>

  )
  
};

export default QueryFlip
