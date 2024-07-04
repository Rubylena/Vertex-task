import Image from "next/image";
import React from "react";
import { ThemeController } from "./ThemeController";

export const Header: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/Vertex-Logo.svg"
            alt="Vertex Logo"
            // className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>

        <ThemeController />
      </div>
    </div>
  );
};
