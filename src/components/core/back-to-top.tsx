"use client";

import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-4 bottom-4 z-50 md:right-8 md:bottom-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.2s, transform 0.2s",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <Button
        size="icon"
        onClick={scrollToTop}
        className="group bg-background hover:bg-foreground dark:border-border h-10 w-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl dark:border"
      >
        <ArrowUpIcon className="group-hover:text-background dark:group-hover:text-background h-5 w-5 transition-all duration-300" />
      </Button>
    </div>
  );
}
