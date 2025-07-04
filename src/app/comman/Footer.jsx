import Link from "next/link";
import React from "react";

export default function Footer() {
  const isLogin = false;
  return (
    <>
      <footer className="border-t border-purple-800/30 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href="/"
                className="text-purple-300 hover:text-purple-100 hover:shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all duration-300 px-2 py-1 rounded-2xl"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-purple-300 hover:text-purple-100 hover:shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all duration-300 px-2 py-1 rounded-2xl"
              >
                Collections
              </Link>
              {isLogin ? (
                <Link
                  href="/dashboard"
                  className="text-purple-300 hover:text-purple-100 hover:shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all duration-300 px-2 py-1 rounded-2xl"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login-register"
                  className="text-purple-300 hover:text-purple-100 hover:shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all duration-300 px-2 py-1 rounded-2xl"
                >
                  Login/Register
                </Link>
              )}
            </div>
            <div className="text-sm text-gray-400 font-medium">
              © {new Date().getFullYear()}
              <span className="text-purple-400 ml-1 drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]">
                MovieApp
              </span>
              . All rights reserved.
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>
        </div>
      </footer>
    </>
  );
}
