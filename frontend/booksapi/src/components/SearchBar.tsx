import { motion } from "framer-motion"
import { FC, useState } from "react"

interface props {
    onClick(query: string): void 
}

const SearchBar: FC<props> = ({...props}) => {

    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchSubmit = () => {
        props.onClick(searchQuery)
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchSubmit()
        }
      }

    return (
    <motion.div className="flex flex-col gap-2 items-center">
    <label  className="mb-2 text-sm font-medium text-white sr-only ">Suchen</label>
      <input
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Suche" required className="text-white text- rounded-md text-center p-0.5 "/>
  <motion.div onClick={handleSearchSubmit}
  className=" cursor-pointer rounded-sm bg-lightGreen hover:bg-green-900 px-2 py-1 ">
    Suchen
  </motion.div>
</motion.div>


    )
}

export default SearchBar