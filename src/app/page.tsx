import { LogoSection } from "@/components/core/logo-section";
import { Footer } from "@/components/core/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-12">
      <LogoSection />

      <div className="flex flex-col items-center max-w-md text-center gap-6 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Connect Vercel to Discord
        </h1>
        <p className="text-muted-foreground">
          Seamlessly integrate your Vercel deployment notifications with
          Discord. Stay updated on every deployment status in real-time.
        </p>
        <Button asChild className="group">
          <Link
            href="https://github.com/kWAYTV/vercel-to-discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
            <Github className="transition-transform group-hover:rotate-12" />
          </Link>
        </Button>
      </div>

      <Footer />
    </main>
  );
}
