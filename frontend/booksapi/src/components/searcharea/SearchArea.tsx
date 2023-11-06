import Filter from "./Filter"
import Switch from "./Switch"
import ListBox from './ListBox'

import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useNavigate } from "react-router-dom"
import { setEbookISBN, setEbookInAuthor, setEbookInTitle, setEbookSubject, setOrderBy } from "../../store/filterReducer"
import { setOpenModal } from "../../store/designReducer"

import styles from "../../static/styles"

import Modal from "./Modal"
import SearchTags from "./SearchTags"
import SearchBar2 from "./SearchBar2"
import Tab from "./Tab"

import { Query, VolumeInfoWithImages } from "../book/queryResult/interfaces"

import QueryFlip from "../book/queryResult/QueryFlip"
const SearchArea = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch()
  const [searchResults, setSearchResults] = useState<VolumeInfoWithImages[]>([])
  const modalOpen = useSelector((state: RootState) => state.designer.openModal.truth)

  const handleModalClose = () => {
    dispatch(setOpenModal({ truth: !modalOpen, modalTitle: "" }))
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 780)
    window.
      window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 780))
    return (
      window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 780))
    )
  }, [isMobile, searchResults])

  const removeFilter = (filter: string) => {
    if (filter === "inAuthor") {
      dispatch(setEbookInAuthor(""))
    }

    if (filter === "inTitle") {
      dispatch(setEbookInTitle(""))
    }

    if (filter === "ISBN") {
      dispatch(setEbookISBN(""))
    }

    if (filter === "subject") {
      dispatch(setEbookSubject(""))
    }
  }

  const navigate = useNavigate()

  const [startIndex, setStartIndex] = useState(0)

  const {
    query,
    maxBooks,
    epubs,
    epubCategory,
    ISBN,
    inTitle,
    inAuthor,
    subject,
    orderBy,
  } = useSelector((state: RootState) => state.filter)


  const handleViewClick = (bookID: string) => {
    navigate(`/book/${bookID}`)
  }

  const handleOrder = (order: string) => {
    dispatch(setOrderBy(order))
  }
  const arr: VolumeInfoWithImages[] = []

  const handleSearchSubmit = async () => {

    try {
      setLoading(true)

      const encodedQuery = encodeURIComponent(query)
      let apiUrl = `http://localhost:5000/search?query=${encodedQuery}`;

      if (epubCategory) {
        if (epubCategory !== "none") {
          if (epubCategory === "paid") {
            apiUrl += `&filter=paid-ebooks`
          } else {
            apiUrl += `&filter=free-ebooks`
          }
        }
      }

      if (inAuthor) {
        const encodedAuthor = encodeURIComponent(inAuthor)
        apiUrl += `&inauthor=${encodedAuthor}`;
      }

      if (inTitle) {
        const encodedTitle = encodeURIComponent(inTitle)
        apiUrl += `&intitle=${encodedTitle}`;
      }

      if (ISBN) {
        const encodedISBN = encodeURIComponent(ISBN)
        apiUrl += `&isbn=${encodedISBN}`;
      }

      if (subject) {
        const encodedSubject = encodeURIComponent(subject)
        apiUrl += `&subject=${encodedSubject}`;
      }

      if (epubs) {
        apiUrl += `&download=epub`
      }
      if (orderBy) {
        apiUrl += `&orderby=${orderBy}`
      }

      apiUrl += `&startIndex=${startIndex}&maxResults=${maxBooks}`;
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      data.items.map(async (item: Query) => {
        const imageResponse = await fetch(`http://localhost:5000/getimg?id=${item.id}`)
        if (imageResponse.ok) {
          const imageData = await imageResponse.json()
          arr.push({ query: item, imageLinks: imageData })
        }
      })
      setSearchResults(arr)
      setLoading(false)
      setDataLoaded(true)
    } catch (error) {
      console.error("API request error:", error)
    }
  }



  return (
    <motion.div
      className=" h-full flex flex-col relative sm:mt-32 md:mt-48 lg:mt-32 overflow-x-clip">
      <AnimatePresence>
        {modalOpen && <motion.div className="modal absolute  left-1/2 transform -translate-x-1/2   w-full p-3 md:p-6 lg:p-12 lg:w-[50%] ">
          <Modal onClose={handleModalClose} /> </motion.div>}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeInOut }}

        className={`${styles.title} mx-auto mb-3 md:mb-6 lg:mb-12`}>
        Search for a book!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: easeInOut }}
        className=" flex flex-col gap-6 p-3 md:p-6 lg:mr-20 md:gap-6 lg:gap-12 md:flex-row lg:flex-row lg:align-middle  md:justify-center lg:justify-end ">

        <Switch />
        {isMobile ? <motion.div className="flex flex-row items-center justify-between z-50">
          <ListBox />
          <Filter />
        </motion.div > : <> <ListBox />
          <Filter /></>}
      </motion.div>
      <SearchBar2 onSearchSubmit={handleSearchSubmit} />
      <SearchTags onRemoveFilter={removeFilter} inTitle={inTitle} inAuthor={inAuthor} ISBN={ISBN} Subject={subject} />

      <motion.div className="flex mx-auto flex-col  ">
        {dataLoaded ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="flex flex-row"
            >
              <Tab onOrder={handleOrder} />
            </motion.div>
          </AnimatePresence>
        ) : null}

        {loading ? (
          <motion.div>Loading...</motion.div>
        ) : dataLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchResults.map((item) => (
              <div key={item.query.id} className="text-justify text-black dark:text-inherit ">
                <QueryFlip onClick={handleViewClick} details={item} />
              </div>
            ))}
          </div>
        ) : !loading && (
          <motion.div>No search results found.</motion.div>
        )}

      </motion.div>
    </motion.div>
  )
}

export default SearchArea