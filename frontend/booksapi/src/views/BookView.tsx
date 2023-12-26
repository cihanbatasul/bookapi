import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GoogleBooksVolume } from "../static/FullBook";

import FullBookVolume from "../components/book/fullBook/FullBookVolume";

const BookView = () => {
  const { id } = useParams();
  const [book, setBook] = useState<GoogleBooksVolume | null>(null);

  const [loading, setLoading] = useState(false);

  const getBook = async (id: string) => {
    try {
      setLoading(true)

      const response = await fetch(`http://localhost:5000/searchbook?id=${id}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setBook(data)
    } catch (error) {
      console.error("API request error:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    if (id) {
      getBook(id)
    }

  }, [id])


  return (
    <motion.div className="flex flex-col bg-white dark:bg-gray-900 text-black dark:text-inherit ">
      {loading ? (
        <motion.div>Loading...</motion.div>
      ) : book ? (
        <FullBookVolume {...book} />
      ) : null}

    </motion.div>
  );
};

export default BookView;