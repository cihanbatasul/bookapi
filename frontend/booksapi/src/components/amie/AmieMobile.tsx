import React from "react";
import { FeatureTitle } from "./Features";
import { motion } from "framer-motion";
import { Search, Filter, Library } from "lucide-react";
type Props = {};
import { Card, CardContent, CardFooter } from "@/shadcncomponents/ui/card";

const AmieMobile = () => {
  const features = [
    {
      title: "Quickly find a book that you've been looking for",
      id: "book-finding",
      icon: <Search className="w-32" />,
    },
    {
      title:
        "Filter by certain criteria to find the exact book you're looking for",
      id: "criteria",
      icon: <Filter className="w-32" />,
    },
    {
      title: "Save books to your libraries and organize your reading",
      id: "libraries",
      icon: <Library className="w-32" />,
    },
  ];
  return (
    <motion.div className="h-full p-6 flex flex-col items-center justify-center gap-12 pt-16 pb-16">
      <h1 className="text-2xl text-black dark:text-gray-200">
        What can you do here
      </h1>

      {features.map((item) => (
        <Card
          key={item.id}
          className="text-black dark:text-inherit text-center p-3 flex flex-col items-center justify-center "
        >
          <CardContent>
            <p>{item.title}</p>
          </CardContent>
          <CardFooter>{item.icon}</CardFooter>
        </Card>
      ))}
    </motion.div>
  );
};

export default AmieMobile;
