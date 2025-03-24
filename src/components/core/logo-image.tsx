import { memo } from "react";
import Image from "next/image";

type LogoImageProps = {
  src: string;
  alt: string;
};

const LogoImage = memo(function LogoImage({ src, alt }: LogoImageProps) {
  return (
    <Image
      className="relative drop-shadow-[0_0_0.3rem_rgba(var(--foreground-rgb),0.4)] dark:invert transform-gpu hover:scale-105"
      src={src}
      alt={alt}
      width={120}
      height={25}
      priority
      style={{ objectFit: "contain", backgroundColor: "transparent" }}
    />
  );
});

export default LogoImage;
