import { motion } from "framer-motion"
import FormTab from '../components/user/FormTab'
import StaggeredText from "../components/StaggeredText"
import { Separator } from "@/shadcncomponents/ui/separator"
import reg from '../assets/reg.png'
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const UserForm = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.user
    .isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1)
    }
  }, [isLoggedIn])


  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1)
    }
  }, [])

  return (
    <motion.div className="  w-full h-full   grid grid-rows-7 ">

      <motion.div className="row-span-3  bg-space-pattern   ">
        <motion.div className="w-full backdrop-blur-lg flex flex-col items-center text-center justify-center">
          <motion.div className="img-container w-full md:w-[40%] lg:w-[20%] p-9 img rounded-full backdrop-blur-sm m-auto ">
            <img className="img hover:scale-125 cursor-pointer ease-in-out" src={reg} />
          </motion.div>
          <motion.div className="main w-[80%] py-6  ">
            <StaggeredText className="text-3xl" text="H.a.p.p.y t.o h.a.v.e y.o.u" />
          </motion.div>
        </motion.div>

      </motion.div>


      <motion.div className="w-full text-center mx-auto row-span-4">

        <FormTab />
      </motion.div>
    </motion.div>
  )
}

export default UserForm