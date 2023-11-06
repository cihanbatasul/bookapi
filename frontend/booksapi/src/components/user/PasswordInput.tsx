import { FC } from "react"
import { motion } from "framer-motion"
import { LockClosedIcon } from "@heroicons/react/solid"
import { EyeIcon } from "@heroicons/react/solid"
import { EyeOffIcon } from "@heroicons/react/solid"

interface props {
    onChange: (input: string) => void
    onVisible: (input:boolean) => void 
    isPassword: boolean
    PlacerholderText: string
    fullWidth?: boolean
}

const PasswordInput: FC<props> = ({...props}) => {
  return (

    <motion.div className={` ${props.fullWidth == true ? 'w-full' : ''} flex flex-row gap-2 items-center `} >
        <motion.div className={`w-[30px] ${props.PlacerholderText === "Repeat Password" ? 'md:hidden lg:hidden' : ''}`}>
<LockClosedIcon/>
        </motion.div>
        <div className=" relative z-0 w-full mb-6 group">
      <input 
      onChange={(e) => props.onChange(e.target.value)}
      type={`${props.isPassword ? 'password' : 'text'}`} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className=" peer-focus:font-medium absolute text-sm left-1 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.PlacerholderText}</label>
      <motion.div
      onClick={() => props.onVisible(!props.isPassword)}
      className="cursor-pointer w-[20px] absolute right-0 top-1/2 -translate-y-1/2">
      {props.isPassword ? <EyeIcon/>  : <EyeOffIcon/> }
      </motion.div>
  </div>
        </motion.div>
    )
}

export default PasswordInput