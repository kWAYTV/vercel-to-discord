"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import LogoImage from "@/components/logo-image";

const LogoSwitcher = () => {
  const [currentLogo, setCurrentLogo] = useState("vercel");

  const toggleLogo = useCallback(() => {
    setCurrentLogo((prev) => (prev === "vercel" ? "next" : "vercel"));
  }, []);

  useEffect(() => {
    const interval = setInterval(toggleLogo, 5000);
    return () => clearInterval(interval);
  }, [toggleLogo]);

  return (
    <div className="relative w-[120px] h-[25px] transform-gpu will-change-transform">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentLogo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0 transform-gpu"
        >
          <LogoImage src={`/${currentLogo}.svg`} alt={`${currentLogo} Logo`} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(LogoSwitcher);
