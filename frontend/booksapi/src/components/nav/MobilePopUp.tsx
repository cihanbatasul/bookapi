import { motion, stagger } from "framer-motion";

const MobilePopUp = () => {
  const menuVariants = {
    hidden: { y: -500, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
    exit: { opacity: 0, y: -500 },
  };

  // Apply stagger effect to the navigation links container
  const menuItemContainerVariants = {
    visible: { transition: { staggerChildren: 0.1 } }, // Adjust the stagger duration as needed
  };

  // Variants for each navigation link
  const menuItemVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="z-50 absolute w-full h-full bg-white dark:bg-gray-900 rounded-md flex flex-col gap-3 text-black dark:text-white text-3xl justify-center"
    >
      {/* Apply stagger effect to the container */}
      <motion.div
        className="navigation-links flex gap-3 flex-col m-auto"
        variants={menuItemContainerVariants}
      >
        {/* Apply individual link variants */}
        <motion.div
          className="hover:text-blue-600 cursor-pointer"
          variants={menuItemVariants}
        >
          Home
        </motion.div>
        <motion.div
          className="hover:text-blue-600 cursor-pointer"
          variants={menuItemVariants}
        >
          My Library
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobilePopUp;