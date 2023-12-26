import { Tab, Tab as TabUI } from "@headlessui/react";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { AnimatePresence } from "framer-motion";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton"
import { Separator } from "@/shadcncomponents/ui/separator";




function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const FormTab = () => {
  const [selectedTab, setSelectedTab] = useState<"Register" | "Login">("Register");

  const categories: Record<"Register" | "Login", { name: string; component: JSX.Element }[]> = {
    Register: [
      {
        name: "register",
        component: <RegisterForm />,
      },
    ],
    Login: [
      {
        name: "login",
        component: <LoginForm />,
      },
    ],
  };

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0 mx-auto">

      <TabUI.Group>
        <TabUI.List className="flex space-x-1 rounded-md bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <TabUI
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
              onClick={() => setSelectedTab(category as "Register" | "Login")}
            >
              {category}
            </TabUI>
          ))}
        </TabUI.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((forms, index) => (
            <Tab.Panel key={index} className={classNames('rounded-md')}>
              <AnimatePresence mode="wait">
                {selectedTab === Object.keys(categories)[index]
                  ? categories[selectedTab][0].component
                  : null}
              </AnimatePresence>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </TabUI.Group>
    </div>
  );
};

export default FormTab;