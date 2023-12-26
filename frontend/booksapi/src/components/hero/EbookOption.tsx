import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FC } from "react"

interface props {
    onEpubClick: (value: boolean) => void
    onEpubCategory: (selectedValue: string | null) => void 
}


const EbookOption: FC<props> = ({...props}) => {
    const [epub, setEpub] = useState(false)
    const [cost, setCost] = useState("")



    const handleEpubClick = () => {
        setEpub(!epub)
    }
    
    useEffect(() => {
    
        props.onEpubClick(epub)
        
    }, [epub])


    return (

    <motion.div>
        <motion.div className="flex flex-row gap-3 text-sm text-justify">
        <motion.div>
        <input onChange={handleEpubClick} id="epub" type="checkbox"/>         
        </motion.div>
        <motion.div>
        <label htmlFor="epub">
        Suche auf Bücher mit Epub-Downloadmöglichkeit restriktieren.
        </label>
        </motion.div>
        </motion.div>

       
<motion.div className="flex flex-row gap-3 pt-5 items-center justify-center">
        
        <motion.div className="flex flex-col gap-2 text-sm">
        <label htmlFor="cost" >Wählen Sie aus, ob kostenlos oder kostenpflichtig: </label>
<select name="cost" id="cost" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-light focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center"
onChange={(e) => props.onEpubCategory(e.target.value)}>
    <option value="none" selected>Beides</option>
    <option value="free">Kostenfrei</option>
    <option value="paid">Kostenpflichtig</option>
</select>
        </motion.div>
      
        </motion.div>


    </motion.div>
    )
}

export default EbookOption