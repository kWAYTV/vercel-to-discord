"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const LogoImage = memo(function LogoImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert transform-gpu"
      src={src}
      alt={alt}
      width={120}
      height={25}
      priority
    />
  );
});

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
