import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Eligibility Report",
  description: "A form that records the students eligibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/Vertex-Logo.svg"
            alt="Vertex Logo"
            // className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
        {children}
      </body>
    </html>
  );
}
