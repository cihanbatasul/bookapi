import { motion } from "framer-motion"
import { GoogleBooksVolume } from "../../../static/FullBook"
import { FC, useEffect, useState } from "react"


const FullBookVolume: FC<GoogleBooksVolume> = ({...book}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)



    useEffect(() => {

        window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 780))

        return (
            window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 780) )
        )
    }, [])

    

  return (
    <motion.div className="min-h-screen flex flex-col p-3 gap-12 w-2/3  ">
        
     {/* Header */}
       <motion.div className="p-1 md:p-3 lg:p-3  ">
       <img 
       src={book.volumeInfo.imageLinks.thumbnail}/>

       <h1 className="text-2xl">{book.volumeInfo.title}</h1>

<motion.div className="flex flex-row gap-3">
    <motion.div>
    <p>Von <motion.span>{book.volumeInfo.authors.join(', ')}</motion.span></p>
    </motion.div>
    <motion.div>
        {book.volumeInfo.publishedDate.slice(0, 4)}
    </motion.div>
</motion.div>
       </motion.div>


    {/* infoarea */}
    <motion.div className=" flex flex-col md:flex-row lg:flex-row gap-6 p-1 md:p-3 lg:p-3 ">
        <motion.div className="flex flex-col gap-3 rounded-sm ">
         <motion.div className="flex flex-col">
            <motion.div className="text-2xl mb-3">
                Über diese Ausgabe
            </motion.div>
            <motion.div className="flex flex-col gap-3">
            <motion.div className="flex flex-row gap-2 flex-wrap ">
            <motion.div className="flex flex-row gap-3 flex-wrap">

                <motion.div className="flex flex-row flex-wrap gap-2">
                <p>ISBN: </p>
                    {book.volumeInfo.industryIdentifiers.map((item) => {
                    return (
                        <motion.div className="flex flex-row gap-1">
                            {item.identifier}
                            {item.type}
                        </motion.div>
                    )
                })} </motion.div>

                <motion.div>
                    Seitenanzahl: {book.volumeInfo.pageCount}
                </motion.div>

            </motion.div>

<motion.div className="flex flex-row gap-3 flex-wrap">
<motion.div className="flex flex-row flex-wrap gap-2">
<motion.div>Veröffentlicht:</motion.div> 
    <motion.div>
        {book.volumeInfo.publishedDate}
    </motion.div>
     </motion.div>
<motion.div>
    Format: {book.volumeInfo.printType}
</motion.div>
</motion.div>
 </motion.div>



<motion.div className="flex flex-row gap-3 flex-wrap">
<motion.div className="flex flex-row flex-wrap gap-2">
<motion.div>Verlag:</motion.div> 
    <motion.div>
        {book.volumeInfo.publisher}
    </motion.div>
     </motion.div>
<motion.div>
    Sprache: {book.volumeInfo.language}
</motion.div>
</motion.div>


<motion.div className="flex flex-row gap-3 flex-wrap">
<motion.div className="flex flex-row flex-wrap gap-2">
<motion.div>{book.volumeInfo.authors.length > 1 ? "Authoren" : "Author"}</motion.div> 
    <motion.div>
        {book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.toString().split(",") : book.volumeInfo.authors}
    </motion.div>
     </motion.div>
</motion.div>

            </motion.div>
            </motion.div>    

            <motion.div className="text-justify">
                {book.volumeInfo.description}
            </motion.div>
            
                <motion.div className="flex flex-row gap-3">
                <p>Altersfreigabe:</p>
                {book.volumeInfo.maturityRating}
                </motion.div>
                <motion.div className="flex flex-row gap-3">
                <p>Verkäuflichkeit:</p>
                {book.saleInfo.saleability}
                </motion.div>
        </motion.div>


        <motion.div className="flex flex-col gap-3">

        </motion.div>
    </motion.div>

        </motion.div>
  )
}

export default FullBookVolume