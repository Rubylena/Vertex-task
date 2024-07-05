"use client";

import Image from "next/image";
import React from "react";
import { ThemeController } from "./ThemeController";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";

export const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center md:justify-between">
      <Link
        className="pointer-events-none py-2 lg:pointer-events-auto lg:p-0 w-full md:w-auto"
        href="/"
      >
        <Image
          src="/Vertex-Logo.svg"
          alt="Vertex Logo"
          className={`${theme === "dark" ? "invert" : "filter-none"}`}
          width={150}
          height={24}
          priority
        />
      </Link>

      <h1 className="font-semibold lg:text-2xl">STUDENT ELIGIBILITY REPORT</h1>

      <div className="flex gap-2 items-center w-full md:w-auto justify-end">
        <ThemeController />

        <div className="flex flex-col items-end">
          <p className="font-semibold">FORM 1</p>
          <p className="text-xs">SIDE 1</p>
        </div>
      </div>
    </div>
  );
};
