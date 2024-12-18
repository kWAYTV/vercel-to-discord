export const Footer = () => {
  return (
    <footer className="fixed bottom-4 px-4 w-full">
      <div className="flex flex-col items-center gap-2">
        <a
          href="https://github.com/kWAYTV/vercel-to-discord"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]"
        >
          GitHub
        </a>
        <p className="text-center text-sm text-gray-400 text-balance drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]">
          This site is not affiliated with or endorsed by Vercel or Discord.
        </p>
      </div>
    </footer>
  );
};
