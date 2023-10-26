import { easeInOut, motion } from "framer-motion"
import PasswordInput from "./PasswordInput"
import { useEffect, useState } from "react"
import Input from "./Input"



interface UserChecking {
  userEmail: string
  userPassword: string
}

const LoginForm = () => {
  const [isPassword, setIsPassword] = useState(true)
  const [responseMsg, setResponseMsg] = useState<{message: string | null}>({message: null})
  const [user, setUser] = useState<UserChecking>(
    {
      userEmail: "",
      userPassword: "",
    }
  )

  const handlePasswordChange = (inputPassword: string) => {
      setUser({
        ...user,
        userPassword: inputPassword
      })
  }



  const handleEmailChange = (inputEmail: string) => {
    setUser({
      ...user,
      userEmail: inputEmail
    })
  }

  const handleLogin = async() => {
    try {
      console.log(user)
      const response = await fetch("http://localhost:5000/login",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      }
      )
      if(!response.ok) {
        console.log("login response not ok")
      }
      if(response.ok) {
        console.log("response login ok")
      }
      const responseData = await response.json()
      setResponseMsg(responseData)
      console.log(responseMsg)
    }catch(error) {
        console.error("error with login", error)
    }
  }

  return (
    <motion.div 
    key={"login-form"}

    initial={{opacity: 0, scale: 0}}
    animate={{opacity: 1, scale: 1}}
    exit={{opacity: 0, scale: 0}}
    transition={{duration: 0.6, ease: easeInOut}}
    className=" flex flex-col gap-3 text-inherit items-center p-3 md:p-6 lg:p-12 ">
      <Input LabelText="Email" onChange={handleEmailChange} type="email" />
      
        <PasswordInput fullWidth={true} PlacerholderText="Password" isPassword={isPassword} onVisible={setIsPassword} onChange={handlePasswordChange} />
      

        <motion.div 
        onClick={handleLogin}
        className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 py-2 text-white cursor-pointer">
          Submit
        </motion.div>
    </motion.div>
    )
}

export default LoginForm