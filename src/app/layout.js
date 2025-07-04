"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "./redux-store/store";
import { Provider } from "react-redux";
import Header from "./comman/Header";
import Footer from "./comman/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 noScroll`}
      >
         <Provider store={store}>

      <Header />

        {children}

        <Footer/>
        </Provider>
      </body>
    </html>
  );
}
