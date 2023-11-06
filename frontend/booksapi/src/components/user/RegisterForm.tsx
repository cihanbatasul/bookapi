import { motion, easeInOut } from "framer-motion"
import PasswordInput from "./PasswordInput"
import { useEffect, useState } from "react"
import Input from "./Input"

interface UserRegistration {
  email: string
  password: string
  userName: string
}

interface UserChecking {
  email: string
  password: string
  passwordRepeat: string
  userName: string
}

const RegisterForm = () => {
  const [isPassword, setIsPassword] = useState(true)
  const [response, setResponse] = useState<{message: string | null}>({message: null})

  const [user, setUser] = useState<UserChecking>(
    {
      email: "",
      password: "",
      passwordRepeat: "",
      userName: ""
    }
  )

  const [UserNoPWRepeat, setUserNoPWRepeat] = useState<UserRegistration>({
    email: user.email,
    password: user.password,
    userName: user.userName,
  })


  useEffect(() => {
    setUserNoPWRepeat({
      email: user.email,
      password: user.password,
      userName: user.userName
    })
  }, [user])

  const handlePasswordChange = (inputPassword: string) => {
      setUser({
        ...user,
        password: inputPassword
      })
  }

  const handlePasswordRepeat = (inputPassword: string) => {
    setUser({
      ...user,
      passwordRepeat: inputPassword
    })
  }

  const handleEmailChange = (inputEmail: string) => {
    setUser({
      ...user,
      email: inputEmail
    })
  }

  const handleUserNameChange = (inputUserName: string) => {
    setUser({
      ...user,
      userName: inputUserName
    })
  }

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(UserNoPWRepeat),
      })

      const data = await response.json()
      setResponse(data)
      console.log(response)
    }catch (error) {
      console.error("Registration error:", error)
    }
  }


  return (
    <motion.div 
    key={"register-form"}
    initial={{opacity: 0, scale: 0}}
    animate={{opacity: 1, scale: 1}}
    exit={{opacity: 0, scale: 0}}
    transition={{duration: 0.6, ease: easeInOut}}
    className=" flex flex-col gap-3 text-inherit items-center p-3 md:p-6 lg:p-12 ">
      <Input LabelText="Email" onChange={handleEmailChange} type="email" />
      <motion.div className="w-full flex flex-col md:flex-row lg:flex-row gap-3">
        <PasswordInput PlacerholderText="Password" isPassword={isPassword} onVisible={setIsPassword} onChange={handlePasswordChange} />
        <PasswordInput PlacerholderText="Repeat Password" isPassword={isPassword} onChange={handlePasswordRepeat} onVisible={setIsPassword}  />
      </motion.div>

      <Input LabelText="User name" onChange={handleUserNameChange} type="email" />

        <motion.div 
        onClick={registerUser}
        className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 py-2 text-white cursor-pointer">
          Submit
        </motion.div>
    </motion.div>
    )
}

export default RegisterForm