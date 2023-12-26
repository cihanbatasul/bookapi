import { forwardRef } from "react";
import { motion } from "framer-motion";
import { VolumeInfoWithImages } from "../book/queryResult/interfaces";
import QueryFlip from "../book/queryResult/QueryFlip";

type Props = {
  dataLoaded: boolean | null;
  searchResults: VolumeInfoWithImages[];
  onOrderClick: (order: string) => void;
  onViewClick: (bookID: string) => void;
};

const SearchResults = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div
      ref={ref}
      className={`flex w-full max-w-7xl m-auto rounded-2xl p-3 ${
        props.dataLoaded === true
          ? " border-black border-2 dark:bg-gray-900 dark:border-none "
          : null
      } `}
    >
      <motion.div className="grid grid-cols-2 grid-rows-4 gap-6 max-w-7xl m-auto p-3">
        {props.searchResults.map(
          (result) =>
            result.imageLinks.thumbnail && (
              <QueryFlip
                key={result.query.id}
                details={result}
                onClick={props.onViewClick}
              />
            ),
        )}
      </motion.div>
    </div>
  );
});

export default SearchResults;
