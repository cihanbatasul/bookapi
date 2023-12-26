import { AnimatePresence, motion } from "framer-motion";
import HeroNew from "@/components/hero/HeroNew";
import SearchAreaNew from "@/components/searcharea/SearchAreaNew";
import AmieWrapper from "@/components/amie/AmieWrapper";
import { setShelves } from "@/store/userReducer";
import { useToast } from "@/shadcncomponents/ui/use-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRef } from "react";
const Home = () => {
  const searchAreaRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
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
      } else {
        if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized!",
            description:
              "Are you logged in? Try to log in to visit your profile",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <motion.div className="home text-[#79808c] min-h-screen ">
      <HeroNew onScrollRef={searchAreaRef} />
      <AmieWrapper />
      <AnimatePresence mode="wait">
        <SearchAreaNew ref={searchAreaRef} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
