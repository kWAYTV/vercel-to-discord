import LogoSwitcher from "@/components/logo-switcher";
import Image from "next/image";

export const LogoSection = () => {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-4 px-4">
      <LogoSwitcher />
      <span className="text-2xl font-bold text-gray-400">x</span>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#5865F270]"
        src="/discord.svg"
        alt="Discord Logo"
        width={50}
        height={50}
        priority
      />
    </div>
  );
};
