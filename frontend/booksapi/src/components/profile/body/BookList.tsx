import { easeInOut, motion } from "framer-motion"

const BookList = () => {
  return (
    <motion.div
    initial={{x: 1000}}
    animate={{x: 0}}
    exit={{x: 1000}}
    transition={{duration: 0.6, ease: easeInOut}}
    className="h-full w-full   "
    >
    <table className="table-auto w-full text-center ">
        <thead>
            <tr>
                <th>
                    
                </th>
                <th>
                    Title
                </th>
                <th>
                    Author
                </th>
                <th>
                    Published
                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
    <tr>
      <td></td>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
      <td>Butt</td>
    </tr>
    <tr>
      <td></td>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
      <td>Butt</td>
    </tr>
    <tr>
    <td></td>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
      <td>Butt</td>
    </tr>
  </tbody>
    </table>
    </motion.div>
  )
}

export default BookList