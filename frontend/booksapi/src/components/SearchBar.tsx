import { motion } from "framer-motion"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { setQuery } from "../store/filterReducer"
interface props {
    onClick(): void 
}

const SearchBar: FC<props> = ({...props}) => {


    const dispatch = useDispatch()

    const handleInputChange = (event: string) => {
        dispatch(setQuery(event))
    }

    const handleSearchSubmit = () => {
        props.onClick()
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
      onChange={(e) =>  handleInputChange(e.target.value)}
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