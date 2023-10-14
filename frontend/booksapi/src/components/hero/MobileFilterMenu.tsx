import { easeIn, motion } from "framer-motion"
import Select from "./Select"

import { useSelector, useDispatch } from "react-redux"
import { setEbooks, setMaxBooks, setEbookCategory } from "../../store/filterReducer"
import { RootState, AppDispatch } from "../../store/store"
import { useEffect } from "react"

const MobileFilterMenu = () => {

    const dispatch: AppDispatch = useDispatch()

    const ebooks = useSelector((state: RootState) => 
    state.filter.ebooks)


    const handleEbookClick = (value: boolean) => {
        dispatch(setEbooks(value))
    }

    const handleEbookCategory = (value: string | null) => {
        dispatch(setEbookCategory(value))
    }


  return (
    <motion.div className="bg-darker w-full md:w-[80%] lg:w-[70%] p-3 flex flex-col justify-center text-justify rounded-sm gap-3 items-center">
    <Select/>

        <motion.div className="flex flex-row gap-3">
            <motion.div>
                Mit Preview
            </motion.div>
            <motion.div>
                Mit vollem Text
            </motion.div>
           
            <motion.div className="flex flex-row gap-3">
                
            </motion.div>

        </motion.div>


        <motion.div className="flex flex-row gap-3">
        <motion.div

        className="cursor-pointer"
        onClick={ebooks ? () => handleEbookClick(false) : () => handleEbookClick(true)}>
                     Nur Ebooks
                </motion.div>
    {ebooks &&  <motion.div className="text-sm">         
            <motion.div
            className="cursor-pointer"
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5, ease: easeIn}}
            onClick={() => handleEbookCategory("free-ebooks")}
            >
                Nur kostenlose Ebooks
            </motion.div>
            <motion.div
            className="cursor-pointer"
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1, ease: easeIn}}
            onClick={() => handleEbookCategory("paid-ebooks")}
            >
                Nur kostenpflichtige Ebooks
            </motion.div>
            </motion.div>
}        </motion.div>

    </motion.div>

    )
}

export default MobileFilterMenu