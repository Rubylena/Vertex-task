import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
      </body>
    </html>
  );
}
