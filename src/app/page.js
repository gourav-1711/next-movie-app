import React from "react";
import Header from "./comman/Header";
import Home from "./comman/home/Home";

export const metadata = {
  title: "MovieMania",
  description: "A FullStack Movie App",
};

export default function page() {
  return (
    <>

      <Home/>
    </>
  );
}
