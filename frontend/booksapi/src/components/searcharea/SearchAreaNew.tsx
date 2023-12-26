import Switch from "@/components/searcharea/Switch";
import Filterr from "@/components/searcharea/Filterr";
import BookAmountSelect from "@/components/searcharea/BookAmountSelect";
import Modal from "@/components/searcharea/Modal";
import SearchTags from "@/components/searcharea/SearchTags";
import SearchBar2 from "@/components/searcharea/SearchBar2";

import SearchResults from "./SearchResults";

import { Query, VolumeInfoWithImages } from "../book/queryResult/interfaces";

import { AppDispatch, RootState } from "@/store/store";
import {
  setEbookISBN,
  setEbookInAuthor,
  setEbookInTitle,
  setEbookSubject,
  setOrderBy,
} from "@/store/filterReducer";
import { setOpenModal } from "@/store/designReducer";

import { forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

type Props = {};

const SearchAreaNew = forwardRef<HTMLDivElement, Props>((props, searchRef) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<VolumeInfoWithImages[]>(
    [],
  );
  const modalOpen = useSelector(
    (state: RootState) => state.designer.openModal.truth,
  );
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleModalClose = () => {
    dispatch(setOpenModal({ truth: !modalOpen, modalTitle: "" }));
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 780);
    window.window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth <= 780),
    );
    return window.removeEventListener("resize", () =>
      setIsMobile(window.innerWidth <= 780),
    );
  }, [isMobile, searchResults]);

  const removeFilter = (filter: string) => {
    if (filter === "inAuthor") {
      dispatch(setEbookInAuthor(""));
    }

    if (filter === "inTitle") {
      dispatch(setEbookInTitle(""));
    }

    if (filter === "ISBN") {
      dispatch(setEbookISBN(""));
    }

    if (filter === "subject") {
      dispatch(setEbookSubject(""));
    }
  };

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
  } = useSelector((state: RootState) => state.filter);

  const handleViewClick = (bookID: string) => {
    navigate(`/book/${bookID}`);
  };

  const handleOrder = (order: string) => {
    dispatch(setOrderBy(order));
  };
  const arr: VolumeInfoWithImages[] = [];

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);

      const encodedQuery = encodeURIComponent(query);
      let apiUrl = `http://localhost:5000/search?query=${encodedQuery}`;

      if (epubCategory) {
        if (epubCategory !== "none") {
          if (epubCategory === "paid") {
            apiUrl += `&filter=paid-ebooks`;
          } else {
            apiUrl += `&filter=free-ebooks`;
          }
        }
      }

      if (inAuthor) {
        const encodedAuthor = encodeURIComponent(inAuthor);
        apiUrl += `&inauthor=${encodedAuthor}`;
      }

      if (inTitle) {
        const encodedTitle = encodeURIComponent(inTitle);
        apiUrl += `&intitle=${encodedTitle}`;
      }

      if (ISBN) {
        const encodedISBN = encodeURIComponent(ISBN);
        apiUrl += `&isbn=${encodedISBN}`;
      }

      if (subject) {
        const encodedSubject = encodeURIComponent(subject);
        apiUrl += `&subject=${encodedSubject}`;
      }

      if (epubs) {
        apiUrl += `&download=epub`;
      }
      if (orderBy) {
        apiUrl += `&orderby=${orderBy}`;
      }

      apiUrl += `&startIndex=${startIndex}&maxResults=${maxBooks}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();

        data.items.map(async (item: Query) => {
          const imageResponse = await fetch(
            `http://localhost:5000/getimg?id=${item.id}`,
          );
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            arr.push({ query: item, imageLinks: imageData });
          }
        });
        setSearchResults(arr);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setLoading(false);
      setDataLoaded(true);
    }
  }, [searchResults]);
  useEffect(() => {
    if (dataLoaded && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [dataLoaded]);

  return (
    <motion.div className="h-fit pb-12" ref={searchRef}>
      <motion.h1
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: easeInOut }}
        className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl text-black dark:text-gray-200"
      >
        Search for a book!
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className=" m-auto pt-16 w-full"
      >
        <motion.div
          className={`max-w-7xl h-full   rounded-t-2xl m-auto p-3 m:p-6 lg:pt-12  flex flex-col`}
        >
          <motion.div className="flex flex-col md:flex-row lg:flex-row gap-3 items-center justify-center">
            <Switch />
            <BookAmountSelect />
            <Filterr />
          </motion.div>
          <motion.div>
            <SearchBar2 onSearchSubmit={handleSearchSubmit} />
            <SearchTags
              ISBN={ISBN}
              Subject={subject}
              inAuthor={inAuthor}
              inTitle={inTitle}
              onRemoveFilter={removeFilter}
            />
          </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
          {modalOpen && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ ease: easeInOut, duration: 0.6 }}
              className={`rounded-b-2xl dark:border-none  max-w-7xl  m-auto p-3 `}
            >
              <Modal onClose={handleModalClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {dataLoaded !== false && (
        <SearchResults
          ref={ref}
          dataLoaded={dataLoaded}
          onOrderClick={handleOrder}
          onViewClick={handleViewClick}
          searchResults={searchResults}
        />
      )}
    </motion.div>
  );
});

export default SearchAreaNew;
