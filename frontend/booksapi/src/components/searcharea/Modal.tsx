import { easeInOut, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { setEbookISBN, setEbookInAuthor, setEbookInTitle, setEbookSubject} from "../../store/filterReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import { useState } from "react";

interface props {
    onClose: () => void
}

const Modal: FC<props> = ({...props}) => {

    const [filterQuery, setFilterQuery] = useState("")

    const title = useSelector((state: RootState) => state.designer.ModalTitle)

    const dispatch: AppDispatch = useDispatch()

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

    const redirectQueryOption = (input: string) => {
        const functionDirectory: {[key: string]: (value: string | null) => void } = {
            "isbn": handleISBNQuery,
            "inAuthor": handleAuthorQuery,
            "inTitle": handleTitleQuery,
            "subject": handleSubjectQuery
        }
    
        const executeFunction = functionDirectory[input]
        return executeFunction
    }

    
    const descriptionDirectory: {[key: string]: {description: string, title: string }} = {
        "isbn": {description: "Enter the ISBN number of the desired book.", title: "ISBN Filter"},
        "inAuthor":  {description: "Enter the name of the desired author.", title: "Author Filter"},
        "inTitle":  {description: "Enter words that the title should contain.", title: "Title Filter"},
        "subject": {description: "Enter a category in which the book is classified.", title: "Category Filter"}
    }

    let description

        if(title) {
            description = descriptionDirectory[title]

        }
    
        const handleSave = (value: string) => {
            const handle = redirectQueryOption(title)
            handle(value)
            props.onClose()
        }


    return (
    <motion.div 
    initial={{opacity: 0, scale: 0}}
    animate={{opacity: 1, scale: 1}}
    exit={{opacity: 0, scale: 0}}
    transition={{duration: 0.8, ease: easeInOut}}
    className="  bg-white dark:bg-gray-800 text-black dark:text-inherit flex flex-col gap-4 p-3 rounded-md shadow-lg border border-gray-300 dark:border-none">
      
        <motion.div>
            {description && description.description}
        </motion.div>
        <motion.div>
        <label htmlFor="filterSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-black dark:text-inherit dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input 
        onChange={(e) => setFilterQuery(e.target.value) }
        type="search" id="filterSearch" className="block w-full p-4 pl-10 text-sm text-black dark:text-inherit border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={description && description.title } required/>
       
    </div>
        </motion.div>
        <motion.div className="flex flex-row gap-3 justify-end">
        <motion.button onClick={props.onClose} className="text-white   bg-violet-800 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-purple-600 font-medium rounded-lg text-sm px-4 py-2 ">Cancel</motion.button>
        <motion.button onClick={() => handleSave(filterQuery) } className="text-white   bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-purple-600 font-medium rounded-lg text-sm px-4 py-2 ">Save</motion.button>
        </motion.div>
    </motion.div>
    )
}

export default Modal