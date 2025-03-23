"use client";

import { memo } from "react";
import Image from "next/image";

const LogoImage = memo(function LogoImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      className="relative drop-shadow-[0_0_0.3rem_rgba(var(--foreground-rgb),0.4)] dark:invert transform-gpu"
      src={src}
      alt={alt}
      width={120}
      height={25}
      priority
    />
  );
});

export default LogoImage;
