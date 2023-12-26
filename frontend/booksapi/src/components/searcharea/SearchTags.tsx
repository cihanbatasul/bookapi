import { easeInOut, motion } from "framer-motion"
import { FC } from "react"

interface props {
    inAuthor: string | null
    inTitle: string | null
    ISBN: string | null
    Subject: string | null
    onRemoveFilter: (filter: string) => void
}

const SearchTags: FC<props> = ({...props}) => {

    const tags: {name: string, filterName: string, value: (string|null)}[] = [{name: "Author",  filterName:"inAuthor", value: props.inAuthor}, {name: "Title", filterName:"inTitle", value:props.inTitle}, {name: "Category", filterName:"subject",value: props.Subject}, {name: "ISBN", filterName:"ISBN", value: props.ISBN}]

    const handleRemoveFilter = (filter: string) => {
        props.onRemoveFilter(filter);
      };

    const colors = ["bg-blue-600", "bg-blue-500", "bg-green-600", "bg-purple-600"]


  return (
    <motion.div
    initial={{x: -500, opacity: 0}}
    animate={{x: 0, opacity: 1}}
    exit={{x: -500, opacity: 0}}
    transition={{duration: 1, ease: easeInOut}}
    className="flex flex-row gap-3 shadow-sm flex-wrap p-3 mx-auto"
    >
        {tags.map((item) => {
            if(item.value !== "") {
                const randomIndex = Math.floor(Math.random() * colors.length)
                const randomColor = colors[randomIndex]
                return (
                    <motion.div >
                    <span id="badge-dismiss-default" className={`inline-flex items-center px-2 py-1 mr-2 text-sm text-black font-medium ${randomColor} bg-blue-100 rounded ${randomColor}`}>
                    <motion.div className="flex flex-row gap-3">
                    <p>{item.name}</p>:<p>{item.value}</p>
                    </motion.div>
                    <button 
                    onClick={() => handleRemoveFilter(item.filterName)}
                    type="button" className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-black" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                      <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                    </motion.div>
                )
            } 
        })}
    </motion.div>
  )
}

export default SearchTags