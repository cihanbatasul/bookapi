import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "@/components/profile/sidebar/Sidebar";
import Browse from "@/components/profile/Browse/Browse";
import Libraries from "@/components/profile/Browse/header/Libraries";
import AllBooks from "@/components/profile/allBooks/AllBooks";
import Footer from '@/components/footer/Footer'

import { ToastAction, } from "@/shadcncomponents/ui/toast";
import { useToast } from "@/shadcncomponents/ui/use-toast";
import Curr from "@/components/profile/libraries/Curr";
import WTR from "@/components/profile/libraries/WTR";
import Favs from "@/components/profile/libraries/Favs";
import Read from "@/components/profile/libraries/Read";

import { setShelves } from "@/store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import AuthorBooks from "@/components/profile/authors/AuthorBooks";
import Authors from "@/components/profile/authors/Authors";
export interface UserBook {
  bookID: string;
  title: string;
  author: string;
  description: string;
  picture: string;
  added_at: Date
}

export interface Shelf {
  shelfType: string;
  shelf: UserBook[];
}

export interface ShelvesResponse {
  userName: string;
  AllShelves: Shelf[];
}

type Props = {
  activeComponent: string
}

const UserProfile = ({ activeComponent }: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast()


  const userData = useSelector((state: RootState) => state.user.shelves)
  const dispatch: AppDispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [currentComponent, setCurrentComponent] = useState("browse")

  const components: Record<string, React.ReactElement> = {
    "browse": <Browse onClick={setCurrentComponent} data={userData} />,
    "libraries": <Libraries onClick={setCurrentComponent} data={userData} />,
    "books": <AllBooks navigate={navigate} data={userData} />,
    "fav": <Favs navigate={navigate} data={userData} />,
    "curr": <Curr navigate={navigate} data={userData} />,
    "read": <Read navigate={navigate} data={userData} />,
    "wtr": <WTR navigate={navigate} data={userData} />,
    "authors": <Authors navigate={navigate} data={userData} />
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
        dispatch(setShelves(responseData));
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
      toast({
        variant: "destructive",
        title: "Bad Response!",
        description: "There was an error fetching your data from the database. Try again or contact the admin",
        action: <ToastAction altText="got it">Got it</ToastAction>
      })
      setIsLoading(false); // Loading failed
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    
      <div className="relative h-full border-t  bg-background flex ">

        <Sidebar sideBarAction={setCurrentComponent} libraries={userData} className="hidden md:hidden lg:block" />

        <div className=" lg:border-1 h-full w-full  px-4 py-6 lg:px-8 flex flex-col    ">
          {getCurrentComponent(currentComponent)}
        </div>


      </div>
        
  
  );
};

export default UserProfile;
