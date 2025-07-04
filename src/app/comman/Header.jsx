"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {

  const [login, setLogin] = useState(false);

  return (
    <>
      <header className="py-6 px-4 bg-gray-900 shadow-md ">
        <div className="max-w-[100vw] mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            {login ? (
              <h1 className="text-3xl font-bold mb-4 md:mb-0 text-background">
                Account
              </h1>
            ) : (
              <Link href={"login-register"} >
              <h1 className="text-3xl font-bold mb-4 md:mb-0 text-background">
                Account
              </h1>
              </Link>
            )}
            <Link
              href="/collections"
              className="text-purple-400 hover:text-purple-300"
            >
              My Collections
            </Link>
          </div>
          
        </div>
      </header>
      {/* <div className=" mx-auto py-4 px-4 bg-gray-800  ">
        
      </div> */}
    </>
  );
}
