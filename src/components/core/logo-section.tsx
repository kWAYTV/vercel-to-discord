import { type FC, Suspense } from "react";
import Image from "next/image";
import LogoSwitcher from "@/components/core/logo-switcher";

const LogoFallback = () => (
  <div className="w-[120px] h-[25px] bg-muted/20 animate-pulse rounded" />
);

const DiscordLogoFallback = () => (
  <div className="w-[50px] h-[50px] bg-muted/20 animate-pulse rounded-lg" />
);

export const LogoSection: FC = function LogoSection() {
  return (
    <section
      aria-label="Product logos"
      className="relative flex flex-wrap items-center justify-center gap-6 px-4 mb-4"
    >
      <Suspense fallback={<LogoFallback />}>
        <LogoSwitcher />
      </Suspense>
      <span
        className="text-3xl font-bold text-muted-foreground"
        aria-hidden="true"
      >
        ×
      </span>
      <div className="transform-gpu transition-all duration-300 hover:scale-105">
        <Suspense fallback={<DiscordLogoFallback />}>
          <Image
            className="relative drop-shadow-[0_0_0.3rem_rgba(88,101,242,0.4)]"
            src="/discord.svg"
            alt="Discord Logo"
            width={50}
            height={50}
            priority
          />
        </Suspense>
      </div>
    </section>
  );
};
