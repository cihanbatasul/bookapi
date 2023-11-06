import { easeInOut, motion } from "framer-motion";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import Input from "./Input";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/shadcncomponents/ui/use-toast";

interface UserChecking {
  userEmail: string;
  userPassword: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const [isPassword, setIsPassword] = useState(true);

  const [user, setUser] = useState<UserChecking>({
    userEmail: "",
    userPassword: "",
  });

  const handlePasswordChange = (inputPassword: string) => {
    setUser({
      ...user,
      userPassword: inputPassword,
    });
  };

  const handleEmailChange = (inputEmail: string) => {
    setUser({
      ...user,
      userEmail: inputEmail,
    });
  };




  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "There was a problem with the login. PLease make sure you have the right credentials."
        })
      }
      if (response.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: "Welcome back!"
        })
        navigate(-1);
      }
      const responseData = await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "There was a problem with the login. PLease make sure you have the right credentials."
      })
    }
  };


  const handleKeyBoardEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }
  return (
    <motion.div
      key={"login-form"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      className=" flex flex-col gap-3 text-inherit items-center p-3 md:p-6 lg:p-12 "
      onKeyDown={(e) => handleKeyBoardEvent(e.target.)}
    >
      <Input LabelText="Email" onChange={handleEmailChange} type="email" />

      <PasswordInput
        fullWidth={true}
        PlacerholderText="Password"
        isPassword={isPassword}
        onVisible={setIsPassword}
        onChange={handlePasswordChange}
      />

      <motion.div
        onClick={handleLogin}
        className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 py-2 text-white cursor-pointer"
      >
        Submit
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;

