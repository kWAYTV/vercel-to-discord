"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LogoSwitcher = () => {
  const [currentLogo, setCurrentLogo] = useState("vercel");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev === "vercel" ? "next" : "vercel"));
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[120px] h-[25px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLogo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={`/${currentLogo}.svg`}
            alt={`${currentLogo} Logo`}
            width={120}
            height={25}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LogoSwitcher;
