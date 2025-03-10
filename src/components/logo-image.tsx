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
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert transform-gpu"
      src={src}
      alt={alt}
      width={120}
      height={25}
      priority
    />
  );
});

export default LogoImage;
