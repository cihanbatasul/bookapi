import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { useToast } from "@/shadcncomponents/ui/use-toast";
import { setShelves } from "@/store/userReducer";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { RootState, AppDispatch } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ShelvesResponse } from "@/views/UserProfile";
import { Edit } from "lucide-react";

interface Props {
  bookID: string;
}

interface ShelfInfo {
  exists: boolean | null;
  shelfType: string | null;
}

const AddToShelveButton: FC<Props> = ({ bookID }) => {
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.shelves);
  const [isBookInShelf, setIsBookInShelf] = useState<ShelfInfo>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiURL = "http://localhost:5000/profile";
        const response = await fetch(apiURL, {
          method: "GET",
          headers: { "CONTENT-TYPE": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const responseData: ShelvesResponse = await response.json();
          dispatch(setShelves(responseData));
        }     
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [dispatch, toast, isBookInShelf, isLoggedIn]);

  const checkIfBookExists = () => {

    if (userData?.AllShelves) {
      const bookExistsInfo = userData.AllShelves
        .flatMap(shelf => (shelf.shelf || []).map(book => ({
          shelfType: shelf.shelfType, bookID: book.bookID
        })))
        .find(book => book.bookID === bookID)
      setIsBookInShelf({
        exists: !!bookExistsInfo,
        shelfType: bookExistsInfo?.shelfType || null
      }
      )
    }
  };

  useEffect(() => {
  if(isLoggedIn) {
    checkIfBookExists();
  }
  }, [userData, bookID, isLoggedIn]);



  const mapShelf = (shelfType: string) => {
    const shelves: Record<string, string> = {
      curr: "Currently Reading",
      wtr: "Plan To Read",
      fav: "Favorites",
      read: "Finished",
      "": "Add To Shelf",
    };
    return shelves[shelfType];
  };

  const handleAddToShelve = async (input: string, callType: string) => {
    try {
      const apiURL = `http://localhost:5000/${callType}/`;
      const data = {
        bookID: bookID,
        shelf: input,
      };

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        toast({
          variant: "default",
          title: "Book added to shelf",
          description: "Book added to shelf successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to add to shelf",
          description: "There was a problem with adding the book to the shelf",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add to shelf",
        description:
          "There was a problem with adding the book to the shelf. Try again or contact the admin",
      });
    }
  };

  const manageBook = (shelf: string) => {
    if (isBookInShelf) {
      handleAddToShelve(shelf, "replace")
    } else {
      handleAddToShelve(shelf, "add")
    }
  }

  return (
    
    <div className="w-64 md:w-56 lg:w-56 m-auto">
      {
        isLoggedIn  && userData && userData?.AllShelves ? (
        <Menu
          as="div"
          className="w-64 md:w-56 lg:w-56 relative inline-block text-left"
        >
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              {isBookInShelf?.exists && isBookInShelf.shelfType
                ? <div className="flex gap-3 items-center"><Edit height={"18px"} />{mapShelf(isBookInShelf.shelfType)} </div>
                : mapShelf("")}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-1/2 right-1/2 -translate-x-1/2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => manageBook("wtr")}
                      className={`${active ? "bg-blue-600 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                    >
                      Plan To Read
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => manageBook("read")}
                      className={`${active ? "bg-blue-600 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                    >
                      Finished
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => manageBook("curr")}
                      className={`${active ? "bg-blue-600 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}

                    >
                      Currently Reading
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => manageBook("fav")}
                      className={`${active ? "bg-blue-600 text-white" : "text-gray-900 "
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                    >
                      Favorites
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ): null}  
          </div>

  );
};

export default AddToShelveButton;
