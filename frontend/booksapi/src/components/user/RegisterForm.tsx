import { motion, easeInOut } from "framer-motion"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
import Input from "./Input"
import { SignUpSchema, SignUpSchemaType } from "@/lib/utils/UserFormSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shadcncomponents/ui/form"
import { Button } from "@/shadcncomponents/ui/button"

import { useNavigate } from "react-router-dom"
import { useToast } from "@/shadcncomponents/ui/use-toast"


const RegisterForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isPassword, setIsPassword] = useState(true)
  const [response, setResponse] = useState<{ message: string | null }>({ message: null })

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    }
  })

  console.log(form.watch())

  const registerUser = async (values: SignUpSchemaType) => {
    try {
      const { confirmPassword, ...requestData } = values
      const response = await fetch("http://localhost:5000/register",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData),
        })

      setResponse(data)
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "There was a problem signing you up. Please try again or contact the staff."
        })
      }
      if (response.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: "Signed up successfully - Welcome!"
        })
        navigate(-1);
      }
      const data = await response.json()
      console.log(response)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "There was a problem with the signup.  Please try again or contact the staff."
      })
    }
  }


  return (
    <motion.div
      key={"register-form"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      className="w-full h-full flex flex-col gap-3 text-inherit  p-3 md:p-6 lg:p-12 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(registerUser)} className="space-y-8">

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input LabelText="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <motion.div className="w-full flex flex-col md:flex-row lg:flex-row gap-3">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput PlacerholderText="Password" isPassword={isPassword} onVisible={setIsPassword} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput PlacerholderText="Repeat Password" isPassword={isPassword} onVisible={setIsPassword} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>
          <FormField control={form.control} name="userName" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input LabelText="User name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 py-2 text-white cursor-pointer"  >
            Submit
          </Button>
        </form>
      </Form>
    </motion.div >
  )
}

export default RegisterForm