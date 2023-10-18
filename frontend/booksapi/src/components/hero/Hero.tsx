import SearchBar from "../SearchBar"
import MobileFilterMenu from "./MobileFilterMenu"
import {motion} from "framer-motion"
import {Key, useEffect, useState} from "react"
import QueryResult from "../book/queryResult/QueryResult"
import {Query} from "../book/queryResult/interfaces"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../store/store"
import {useNavigate} from "react-router-dom"
import { setOrderBy } from "../../store/filterReducer"

const Hero = () => {
  const [SearchResults,setSearchResults] = useState<Query[]>([])
  const [loading, setLoading] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const searchQuery = useSelector((state: RootState) => state.filter.query)
  const maxResults = useSelector((state: RootState) => state.filter.maxBooks)
  const inTitle = useSelector((state: RootState) => state.filter.intitle)
  const inAuthor = useSelector((state: RootState) => state.filter.inauthor)
  const isbn = useSelector((state: RootState) => state.filter.ISBN)
  const subject = useSelector((state: RootState) => state.filter.subject)
  
  const isEpub = useSelector((state: RootState) => state.filter.epubs)
  const epubCategory = useSelector((state: RootState) => state.filter.epubCategory)
  const orderBy = useSelector((state: RootState) => state.filter.orderBy)

  const navigate = useNavigate()
  const handleViewClick  = (bookID: string) => {
    navigate(`/book/${bookID}`)
  }
  const dispatch = useDispatch()

  const handleSearchSubmit = async () => {

    try{
      setLoading(true)

      const encodedQuery = encodeURIComponent(searchQuery)
      let apiUrl = `http://localhost:5000/search?query=${encodedQuery}`;

      if(epubCategory) {
        if(epubCategory !== "none") {
          if(epubCategory === "paid") {
            apiUrl  += `&filter=paid-ebooks`
          } else {
            apiUrl += `&filter=free-ebooks`
          }
        }
      }

      if (inAuthor) {
      const encodedAuthor =  encodeURIComponent(inAuthor)
      apiUrl += `&inauthor=${encodedAuthor}`;
      }

      if (inTitle) {
      const encodedTitle =  encodeURIComponent(inTitle)
        apiUrl += `&intitle=${encodedTitle}`;
      }

      if (isbn) {
      const encodedISBN =  encodeURIComponent(isbn)
        apiUrl += `&isbn=${encodedISBN}`;
      }

      if (subject) {
      const encodedSubject =  encodeURIComponent(subject)
        apiUrl += `&subject=${encodedSubject}`;
      }

      if (isEpub) {
        apiUrl += `&download=epub`
      }
      if(orderBy) {
        apiUrl += `&orderby=${orderBy}`
      }

      apiUrl += `&startIndex=${startIndex}&maxResults=${maxResults}`;

      const response = await fetch(apiUrl)
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
  }

  const handleOrder = (order: string) => {
    dispatch(setOrderBy(order))
  }

  useEffect(() => {
    handleSearchSubmit()
  }, [orderBy, maxResults])

  return (

    <motion.div className="hero flex flex-col items-center  justify-center  text-justify p-3 gap-6">
      <motion.div className="text-xl ">
      Willkommen auf meiner Books API. Aufgebaut auf der Google Books API, erlaubt sie alles, was man von einer Books API erwartet und mehr.
      </motion.div>
      <motion.div className="search">
        <motion.div className="mb-2">
        Tätigen Sie Ihre erste Suche: 
        </motion.div>
        <SearchBar onClick={handleSearchSubmit}/>
</motion.div>
<MobileFilterMenu/>
{SearchResults &&    <motion.div className=" flex justify-end items-end">
     
      <select id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-light focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center"
onChange={(e) => handleOrder(e.target.value)}>
    <option selected>Ordnen nach</option>
    <option value="relevance">Relevanz</option>
    <option value="newest">Neuste</option>
</select>
        </motion.div>}
{loading ? <motion.div>Loading...</motion.div> :  SearchResults && 

SearchResults.map((item => {
  return (
    <motion.div
    className="text-justify h-full w-full lg:w-[70%] flex flex-col ">
   
  <QueryResult onClick={handleViewClick} key={item.id} id={item.id} etag={item.etag} selfLink={item.selfLink} volumeInfo={item.volumeInfo} />
    
    <hr className="w-full h-px my-8 bg-darker border-0 dark:bg-darker"/>
    </motion.div>
    )
}) )}
</motion.div>
    )
}

export default Hero