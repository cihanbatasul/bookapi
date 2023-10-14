import SearchBar from "../SearchBar"
import MobileFilterMenu from "./MobileFilterMenu"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import QueryResult from "../book/queryResult/QueryResult"
import { Query } from "../book/queryResult/interfaces"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
const Hero = () => {
  const [SearchResults,setSearchResults] = useState<Query[]>([])
  const [loading, setLoading] = useState(false)
  const [startIntex, setStartIndex] = useState(0)
  

  const maxResults = useSelector((state: RootState) => state.filter.maxBooks)

  const handleSearchSubmit = async (searchQuery: string) => {

    try{
      setLoading(true)

      const response = await fetch(`http://localhost:5000/search?query=${searchQuery}&startIndex=${startIntex}&maxResults=${maxResults}`)
        if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setSearchResults(data.items)
    }catch (error) {
      console.error("API request error:", error)
    } finally {
      setLoading(false)
    }
    console.log(SearchResults)
  }

 useEffect(() => {
  console.log(maxResults)
 }, [maxResults])
  return (

    <motion.div className=" h-full bg-light text-black flex flex-col items-center  justify-center  text-justify p-3 gap-6">
      <motion.div className="text-xl ">
      Willkommen auf meiner Books API. Aufgebaut auf der Google Books API, erlaubt sie alles, was man von einer Books API erwartet und mehr.
      </motion.div>
      <motion.div className="search">
        <motion.div>
        Tätigen Sie Ihre erste Suche: 
        </motion.div>
        <SearchBar onClick={handleSearchSubmit}/>
</motion.div>
<MobileFilterMenu/>
{loading ? <motion.div>Loading...</motion.div> :  SearchResults && SearchResults.map((item => {
  return (
    <motion.div className="text-justify w-full lg:w-[70%] flex flex-col items-center ">
  <QueryResult key={item.id} id={item.id} etag={item.etag} selfLink={item.selfLink} volumeInfo={item.volumeInfo} />
    
    <hr className="w-full h-px my-8 bg-darker border-0 dark:bg-darker"/>
    </motion.div>
    )
}) )}
    </motion.div>
    )
}

export default Hero