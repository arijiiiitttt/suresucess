"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Start the animation and reveal the main content after a delay
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2000); // 2 seconds delay for the animation

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <>
      {/* Animated Logo Transition */}
      {!isAnimationComplete && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Image
            src="./logoo.svg"
            alt="Logo"
            height={300}
            width={300}
            className="animate-slide-to-navbar"
          />
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`bg-white w-full h-[7rem] flex items-center justify-center fixed top-0 z-50 transition-opacity duration-500 ${
          isAnimationComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center space-x-6">
          {/* Navbar Logo */}
          <Image src="./logoo.svg" alt="Logo" height={52} width={52} />

          {/* Navigation Links */}
          <ul className="flex space-x-6 list-none text-[1rem] font-medium">
            <li>
              <Link
                href="docs"
                className="popblack text-black underline-offset-4 font-semibold underline decoration-2 decoration-blue-500 hover:text-red-600 transition"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="line-through text-black underline-offset-8 decoration-red-500 font-bold hover:text-red-600 transition"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-800 text-black hover:text-red-600 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="popblack text-black underline-offset-4 font-semibold underline decoration-2 decoration-wavy decoration-red-500"
              >
                Contact Me
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-[7rem]">{children}</div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-slide-to-navbar {
          animation: slide-to-navbar 2s ease-in-out forwards;
        }

        @keyframes slide-to-navbar {
          0% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(0.8) translateY(-30vh);
          }
          100% {
            transform: scale(0.4) translateY(-100vh);
          }
        }
      `}</style>
    </>
  );
};

export default RootLayout;