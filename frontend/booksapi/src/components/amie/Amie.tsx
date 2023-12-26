import { motion, easeInOut } from "framer-motion";
import { FeatureTitle } from "./Features";
import { BookFinding, Criteria, Libraries } from "./AmieCard";

const features = [
  {
    title: "Quickly find a book that you've been looking for",
    id: "book-finding",
    card: BookFinding,
  },
  {
    title:
      "Filter by certain criteria to find the exact book you're looking for",
    id: "criteria",
    card: Criteria,
  },
  {
    title: "Save books to your libraries and organize your reading",
    id: "libraries",
    card: Libraries,
  },
];

const Amie = () => {
  return (
    <div className="">
      <motion.h1
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: easeInOut }}
        className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl text-black dark:text-gray-200"
      >
        What can you do on this site
      </motion.h1>
      <div className="flex justify-center p-3">
        <div className="flex  w-full gap-20 items-start max-w-6xl ">
          <div className="w-full py-[50vh]">
            <ul>
              {features.map((feature) => (
                <li key={feature.id}>
                  <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full sticky top-0 h-screen flex items-center">
            <div className="relative w-full aspect-square rounded-2xl bg-background">
              {features.map((feature) => (
                <feature.card id={feature.id} key={feature.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amie;
