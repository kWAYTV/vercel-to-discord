import LogoSwitcher from "@/components/logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative flex items-center gap-4">
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
      <footer className="fixed bottom-4 text-sm text-gray-400">
        <p className="text-center drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]">
          This site is not affiliated with or endorsed by Vercel or Discord.
        </p>
      </footer>
    </main>
  );
}
