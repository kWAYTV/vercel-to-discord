"use client";

import { useState, useEffect, useCallback, memo, type FC } from "react";
import LogoImage from "@/components/core/logo-image";

type LogoType = "vercel" | "next";

const LogoSwitcher: FC = function LogoSwitcher() {
  const [currentLogo, setCurrentLogo] = useState<LogoType>("vercel");

  const toggleLogo = useCallback(() => {
    setCurrentLogo((prev) => (prev === "vercel" ? "next" : "vercel"));
  }, []);

  useEffect(() => {
    const interval = setInterval(toggleLogo, 5000);
    return () => clearInterval(interval);
  }, [toggleLogo]);

  return (
    <div
      className="relative w-[120px] h-[25px] bg-transparent"
      aria-label={`Current logo: ${currentLogo}`}
      role="img"
    >
      <div
        className={`
          absolute inset-0 
          transition-all duration-700 ease-in-out
          ${
            currentLogo === "vercel"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }
        `}
        aria-hidden={currentLogo !== "vercel"}
      >
        <LogoImage src="/vercel.svg" alt="Vercel Logo" />
      </div>

      <div
        className={`
          absolute inset-0 
          transition-all duration-700 ease-in-out
          ${
            currentLogo === "next"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }
        `}
        aria-hidden={currentLogo !== "next"}
      >
        <LogoImage src="/next.svg" alt="Next.js Logo" />
      </div>
    </div>
  );
};

export default memo(LogoSwitcher);
