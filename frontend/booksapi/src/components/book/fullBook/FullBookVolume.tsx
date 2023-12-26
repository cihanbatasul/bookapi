import { motion } from "framer-motion"
import { GoogleBooksVolume } from "../../../static/FullBook"
import { FC, useEffect, useState } from "react"
import AddToShelveButton from "../../profile/bookshelves/AddToShelveButton"
type ShelfInfo = {
    exists: boolean | null
    shelfType: string | null
}

const FullBookVolume: FC<GoogleBooksVolume> = ({ ...book }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)

    useEffect(() => {

        window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 780))

        return (
            window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 780))
        )
    }, [])


    return (
        <motion.div className="min-h-screen bg-background flex flex-col p-3 gap-12 w-full justify-center ">

            <motion.div className="flex flex-col items-center justify-center gap-3 p-1 w-full  ">
                <motion.div className="flex flex-col  gap-3 items-center ">
                    <img className="rounded-xl" src={book.volumeInfo.imageLinks.thumbnail} />
                    <AddToShelveButton bookID={book.id} />
                </motion.div>
                <motion.div className="flex flex-col gap-2 md:items-center lg:items-center">
                    <h1 className="text-lg"> {book.volumeInfo.title}</h1>
                    <h1 className="text-gray-700 dark:text-gray-600">{book.volumeInfo.authors}</h1>
                </motion.div>

            </motion.div>
            <motion.div className="flex flex-row justify-evenly md:justify-center md:gap-12 text-sm md:text-base">
                <p >{book.volumeInfo.pageCount} Pages</p>
                <p >{book.volumeInfo.language}</p>
                <p className=" cursor-pointer hover:text-blue-600"><a href={book.volumeInfo.previewLink}>Preview</a></p>
                <p >{book.volumeInfo.publisher}</p>
            </motion.div>

            {/* infoarea */}
            <motion.div className="w-full flex items-center justify-center">
                <motion.div className=" w-full lg:w-1/2 ">
                    <motion.div className="text-justify">
                        {book.volumeInfo.description}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default FullBookVolume
