import { easeInOut, motion } from "framer-motion";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import Input from "./Input";
import { Button } from "@/shadcncomponents/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shadcncomponents/ui/use-toast";
import { SignInSchemaType, SignInSchema } from "@/lib/utils/UserFormSchemas";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shadcncomponents/ui/form";
const LoginForm = () => {

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    }
  })
  const navigate = useNavigate();
  const { toast } = useToast()
  const [isPassword, setIsPassword] = useState(true);

  const handleLogin = async (values: SignInSchemaType) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Failure",
        description: "There was a problem with the login. PLease make sure you have the right credentials."
      })
    }
  }

  return (
    <motion.div
      key={"login-form"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      className="w-full h-full flex flex-col gap-3 text-inherit  p-3 md:p-6 lg:p-12"
    >
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <FormField control={form.control} name="userEmail" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input LabelText="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="userPassword" render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  fullWidth={true}
                  PlacerholderText="Password"
                  isPassword={isPassword}
                  onVisible={setIsPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 py-2 text-white cursor-pointer" type="submit">Submit</Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;

