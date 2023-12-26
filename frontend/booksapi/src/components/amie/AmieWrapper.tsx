import React from "react";
import Amie from "@/components/amie/Amie";
import AmieMobile from "@/components/amie/AmieMobile";
import { useState, useEffect } from "react";
const AmieWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth <= 780),
    );
    return () =>
      window.removeEventListener("resize", () =>
        setIsMobile(window.innerWidth <= 780),
      );
  }, []);
  return isMobile ? <AmieMobile /> : <Amie />;
};

export default AmieWrapper;
