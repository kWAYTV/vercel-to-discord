"use client";

import { cn } from "@/lib/utils";
import React, { memo } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = memo(function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(var(--aurora-gradient-angle),var(--white)_0%,var(--white)_var(--gradient-stop-1),var(--transparent)_var(--gradient-stop-2),var(--transparent)_var(--gradient-stop-3),var(--white)_var(--gradient-stop-4))]
            [--dark-gradient:repeating-linear-gradient(var(--aurora-gradient-angle),var(--black)_0%,var(--black)_var(--gradient-stop-1),var(--transparent)_var(--gradient-stop-2),var(--transparent)_var(--gradient-stop-3),var(--black)_var(--gradient-stop-4))]
            [--aurora:repeating-linear-gradient(var(--aurora-gradient-angle),var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[var(--aurora-blur-amount)] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:[animation:aurora_var(--aurora-animation-duration)_linear_infinite]
            after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-[var(--aurora-opacity)]
            transform-gpu translate-z-0
            motion-reduce:after:animation-duration-[0s]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
});
