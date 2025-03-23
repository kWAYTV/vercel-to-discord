import LogoSwitcher from "@/components/core/logo-switcher";
import Image from "next/image";

export const LogoSection = () => {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-6 px-4 mb-4">
      <LogoSwitcher />
      <span className="text-3xl font-bold text-muted-foreground">×</span>
      <div className="transform-gpu transition-all duration-300 hover:scale-105">
        <Image
          className="relative drop-shadow-[0_0_0.3rem_rgba(88,101,242,0.4)]"
          src="/discord.svg"
          alt="Discord Logo"
          width={50}
          height={50}
          priority
        />
      </div>
    </div>
  );
};
