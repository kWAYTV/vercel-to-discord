import { LogoSection } from "@/components/logo-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <LogoSection />
      <Footer />
    </main>
  );
}
