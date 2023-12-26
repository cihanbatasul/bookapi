import { AppDispatch } from "../../store/store"
import { setQuery } from "../../store/filterReducer"
import { useDispatch } from "react-redux"
import { FC } from "react"
import { motion, easeInOut } from "framer-motion"
import { KeyboardEvent } from "react"
import { Button } from "@/shadcncomponents/ui/button"
interface props {
  onSearchSubmit: () => void
}

const SearchBar2: FC<props> = ({ ...props }) => {
  const dispatch: AppDispatch = useDispatch()


  const handleSearchSubmit = (input: string) => {
    dispatch(setQuery(input))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      props.onSearchSubmit()
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="p-3 md:p-5 lg:p-12 lg:w-full  "

    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-black dark:text-inherit sr-only shadow-lg">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          onChange={(e) => handleSearchSubmit(e.target.value)}
          onKeyDown={handleKeyPress}
          type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Type in general search query..." required />

        <Button type="submit" className=" absolute right-2.5 bottom-2.5  " onClick={props.onSearchSubmit}>Search</Button>
      </div>
    </motion.div>
  )
}

export default SearchBar2
