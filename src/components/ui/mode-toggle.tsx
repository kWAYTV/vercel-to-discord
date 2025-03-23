"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative overflow-hidden rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm border border-border/50 hover:border-border hover:bg-accent/30 active:scale-90 transition-all duration-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Toggle theme"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-150 ${
          isHovering ? "scale-110" : "scale-100"
        }`}
      >
        <Sun
          className={`h-[1.2rem] w-[1.2rem] transition-all duration-150 ease-in-out ${
            theme === "dark"
              ? "rotate-[-45deg] translate-y-10 opacity-0"
              : "rotate-0 translate-y-0 opacity-100"
          } ${isHovering ? "text-foreground" : "text-muted-foreground"}`}
        />
      </span>

      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-150 ${
          isHovering ? "scale-110" : "scale-100"
        }`}
      >
        <Moon
          className={`h-[1.2rem] w-[1.2rem] transition-all duration-150 ease-in-out ${
            theme === "dark"
              ? "rotate-0 translate-y-0 opacity-100"
              : "rotate-45 -translate-y-10 opacity-0"
          } ${isHovering ? "text-foreground" : "text-muted-foreground"}`}
        />
      </span>
    </Button>
  );
}
