import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-4 px-4 w-full">
      <div className="flex flex-col items-center gap-2">
        <Link
          href="https://github.com/kWAYTV/vercel-to-discord"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm drop-shadow-[0_0_8px_rgba(156,163,175,0.5)] flex items-center"
        >
          GitHub
          <ArrowUpRight className="w-3 h-3 ml-0.5 inline-flex" />
        </Link>
        <p className="text-center text-sm text-muted-foreground text-balance drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]">
          This site is not affiliated with or endorsed by Vercel or Discord.
        </p>
      </div>
    </footer>
  );
};
