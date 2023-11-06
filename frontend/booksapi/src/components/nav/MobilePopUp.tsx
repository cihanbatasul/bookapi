import { easeIn, motion, stagger } from "framer-motion";

import { useDispatch } from "react-redux"


import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

import { AppDispatch } from "../../store/store";
import { logoutUser as logout } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../ThemeProvider";
type Props = {
  signOutOnClick: () => void
}

const MobilePopUp = ({ signOutOnClick }: Props) => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  const { setTheme } = useTheme()


  const menuVariants = {
    hidden: { y: -500, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
    exit: { opacity: 0, y: -500 },
  };

  const menuItemContainerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };


  const logoutUser = async () => {
    const apiURL = "http://localhost:5000/logout"

    try {
      const response = await fetch(apiURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch(logout())

      } else {
        console.error("Logout failed. Please try again.")

      }
    } catch (error) {
      console.error("An error occurred during logout:", error)

    }
  }



  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="z-50 absolute  w-full h-full bg-white dark:bg-gray-900 rounded-md flex flex-col gap-3 text-black dark:text-white text-xl justify-center"
    >
      {/* Apply stagger effect to the container */}
      <motion.div
        className="navigation-links flex gap-3 flex-col m-auto"
        variants={menuItemContainerVariants}
      >
        {/* Apply individual link variants */}
        <motion.div
          className="hover:text-blue-600 cursor-pointer flex flex-row gap-3 items-center m-auto"
          variants={menuItemVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <motion.div>
            Home
          </motion.div>
        </motion.div>
        {isLoggedIn && <motion.div onClick={() => navigate("/profile")}
          className="hover:text-blue-600 cursor-pointer flex flex-row gap-3 items-center  m-auto "
          variants={menuItemVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <motion.div>
            My Profile
          </motion.div>
        </motion.div>}

        {!isLoggedIn ? <motion.div
          onClick={() => navigate("/user")}
          className="hover:text-blue-600 cursor-pointer flex flex-row gap-3 items-center  m-auto "
          variants={menuItemVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <motion.div>
            Sign Up
          </motion.div>
        </motion.div> :
          <motion.div onClick={logoutUser}
            className="hover:text-blue-600 cursor-pointer flex flex-row gap-3 items-center  m-auto "
            variants={menuItemVariants}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <motion.div>
              Sign Out
            </motion.div>
          </motion.div>}

        <motion.div>

          <motion.div
            className="h-16 flex flex-row  gap-3 text-sm cursor-pointer items-center justify-center ">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeIn, delay: 1 }}
              onClick={() => setTheme('light')}
              className={`flex flex-row gap-3 items-center justify-center  rounded-md p-1  bg-background`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <motion.div>
                Light Mode
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeIn, delay: 1 }}
              onClick={() => setTheme('dark')}
              className={`flex flex-row gap-3 items-center rounded-md p-1 bg-background`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <motion.div >
                Dark Mode
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>


      </motion.div>
    </motion.div>


  );
};

export default MobilePopUp;