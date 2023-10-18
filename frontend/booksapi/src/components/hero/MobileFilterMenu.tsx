import { motion } from "framer-motion"
import Select from "./Select"

import { useSelector, useDispatch } from "react-redux"
import { setEpubs, setMaxBooks, setEpubCategory, setEbookISBN, setEbookInAuthor, setEbookInTitle, setEbookSubject } from "../../store/filterReducer"
import { RootState, AppDispatch } from "../../store/store"
import { useEffect, useState } from "react"


import AdditionalOptions from "./AdditionalOptions"
import EbookOption from "./EbookOption"
const MobileFilterMenu = () => {

    const [additionalOptionsOpen, setAdditionalOptionsOpen] = useState(false)
    const dispatch: AppDispatch = useDispatch()

    const ebooks = useSelector((state: RootState) => 
    state.filter.epubs)

    const handleAdditionalOptionsClick = () => {
        setAdditionalOptionsOpen(!additionalOptionsOpen)
    }

    const handleEpubClick = (value: boolean) => {
        dispatch(setEpubs(value))
    }

    const handleEpubCategory = (value: string | null) => {
        dispatch(setEpubCategory(value))
    }

    const handleISBNQuery = (value:string | null ) =>  {
        dispatch(setEbookISBN(value))
    }

    const handleAuthorQuery = (value:string | null ) =>  {
        dispatch(setEbookInAuthor(value))
    }

    const handleTitleQuery = (value:string | null ) =>  {
        dispatch(setEbookInTitle(value))
    }

    const handleSubjectQuery = (value:string | null ) =>  {
        dispatch(setEbookSubject(value))
    }

    const redirectQueryOption = (input: string, functionName:  string) => {
        const functionDirectory: {[key: string]: (value: string | null) => void } = {
            "isbn": handleISBNQuery,
            "inAuthor": handleAuthorQuery,
            "inTitle": handleTitleQuery,
            "subject": handleSubjectQuery
        }

        const executeFunction = functionDirectory[functionName]
        executeFunction(input)
    }
    
  return (
    <motion.div className="bg-darker w-full md:w-[80%] lg:w-[70%] p-3 flex flex-col justify-center text-justify rounded-sm gap-3 items-center">
    <Select/>
    <motion.div className="text-xl pb-2 cursor-pointer flex gap-3" onClick={handleAdditionalOptionsClick}>
    Zusätzliche Filter 
    {
    additionalOptionsOpen ? 
    <span>&#120;</span> : 
    <span>&darr;</span> 
    }
    </motion.div>
    {additionalOptionsOpen ? 
    <AdditionalOptions onChange={redirectQueryOption} /> : 
    null}

<EbookOption onEpubClick={handleEpubClick} onEpubCategory={handleEpubCategory} />
    </motion.div>

    )
}

export default MobileFilterMenu