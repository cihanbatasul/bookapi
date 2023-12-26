import React, { useEffect } from "react";
import { ShelvesResponse } from "@/views/UserProfile";
type Shelves = Awaited<Promise<ShelvesResponse>>;
import { NavigateFunction } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAuthors } from "@/store/userReducer";
import AuthorBooks from "./AuthorBooks";
type Props = {
  data: Shelves;
  navigate: NavigateFunction;
};

type AuthorsData = string[];

const Authors = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const authors = useSelector((state: RootState) => state.user.authors);
  const fetchAuthors = async () => {
    try {
      const apiURL = `http://localhost:5000/authors/`;
      const response = await fetch(apiURL, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log("success fetching authors from backend");
        const data: AuthorsData = await response.json();
        const splitAuthors = data.flatMap((author) => author.split(","));
        dispatch(setAuthors(splitAuthors));
      }
    } catch (error) {
      console.log("error fetching authors: ", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="pb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Authors
      </h1>
      <div className="pb-16">
        <p className="">Find other books by the authors in your library.</p>
      </div>
      <div className="flex flex-col  gap-3 md:gap-56 lg:gap-56 ">
        {authors.length > 0 ? (
          authors.map((author, index) => (
            <AuthorBooks
              navigate={props.navigate}
              key={index}
              author={author}
            />
          ))
        ) : (
          <p>No Authors</p>
        )}
      </div>
    </div>
  );
};

export default Authors;

