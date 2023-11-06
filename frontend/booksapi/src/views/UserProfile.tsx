import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "@/components/profile/sidebar/Sidebar";

import Browse from "@/components/profile/Browse/Browse";
import Libraries from "@/components/profile/Browse/header/Libraries";
import AllBooks from "@/components/profile/allBooks/AllBooks";


import { ToastAction, } from "@/shadcncomponents/ui/toast";
import { useToast } from "@/shadcncomponents/ui/use-toast";
import Curr from "@/components/profile/libraries/Curr";
import WTR from "@/components/profile/libraries/WTR";
import Favs from "@/components/profile/libraries/Favs";
import Read from "@/components/profile/libraries/Read";

export interface UserBook {
  bookID: string;
  title: string;
  author: string;
  description: string;
  picture: string;
}

export interface Shelf {
  shelfType: string;
  shelf: UserBook[];
}

export interface ShelvesResponse {
  userName: string;
  AllShelves: Shelf[];
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast()

  const [userData, setUserData] = useState<ShelvesResponse>({
    userName: "User",
    AllShelves: [
      {
        shelfType: "curr",
        shelf: [
          {
            bookID: "1",
            title: "Current Book",
            author: "Author 1",
            description: "Description of the current book",
            picture: "url-to-book-image",
          },
        ],
      },
      {
        shelfType: "fav",
        shelf: [
          {
            bookID: "2",
            title: "Favorite Book",
            author: "Author 2",
            description: "Description of the favorite book",
            picture: "url-to-book-image",
          },
        ],
      },
      {
        shelfType: "wtr",
        shelf: [
          {
            bookID: "3",
            title: "Want to Read Book",
            author: "Author 3",
            description: "Description of the want to read book",
            picture: "url-to-book-image",
          },
        ],
      },
      {
        shelfType: "read",
        shelf: [
          {
            bookID: "4",
            title: "Read Book",
            author: "Author 4",
            description: "Description of the read book",
            picture: "url-to-book-image",
          },
        ],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [currentComponent, setCurrentComponent] = useState(0)

  const components: Record<number, React.ReactElement> = {
    0: <Browse data={userData} />,
    1: <Libraries data={userData} />,
    2: <AllBooks data={userData} />,
    5: <Favs data={userData} />,
    6: <Curr data={userData} />,
    7: <Read data={userData} />,
    8: <WTR data={userData} />
  };

  const getCurrentComponent = (curr: number): React.ReactElement | null => {
    return components[curr] || null
  };


  const fetchUserData = async () => {
    try {
      const apiURL = "http://localhost:5000/profile";

      const response = await fetch(apiURL, {
        method: "GET",
        headers: { "CONTENT-TYPE": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setUserData(responseData);
        setIsLoading(false); // Data is loaded

      } else {
        if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized!",
            description: "Are you logged in? Try to log in to visit your profile",
            action: <ToastAction altText="got it">Got it</ToastAction>
          })
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Loading failed
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <>

      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar sideBarAction={setCurrentComponent} libraries={userData} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-1">
              <div className="h-full px-4 py-6 lg:px-8">
                {getCurrentComponent(currentComponent)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UserProfile;
