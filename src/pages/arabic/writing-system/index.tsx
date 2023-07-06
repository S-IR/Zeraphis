import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Page: NextPage = () => {
  return (
    <>
      <NextSeo
        title={"Learn the Arabic Script - Zeraphis"}
        description={
          "Learn the Arabic writing system in order to deepen your knowledge of Islam "
        }
      />
      <div className="relative flex h-[calc(100vh-75px)] w-full flex-col items-center   space-y-28 align-middle ">
        <div className="absolute -top-[75px] left-0 -z-10  h-screen  w-screen   ">
          <Image
            src={"/arabic/writing-system/bg2.png"}
            className="-z-10 brightness-[0.1] filter "
            alt={
              "background image for the writing system section of a menu design"
            }
            fill
          />
        </div>
        <h1 className="!mt-28 text-center text-6xl  text-yellow-500">
          Do you already know <br></br> some of the Arabic writing system?
        </h1>
        <h2 className="!mt-28 text-4xl text-yellow-500/70">
          You can take a small test or start from scratch
        </h2>
        <div className="!mb-20 !mt-auto flex space-x-64">
          <Link
            href={"/arabic/writing-system"}
            className="flex h-64 w-80 items-center justify-center rounded-2xl bg-gradient-to-b from-white  to-[#D6A45C] text-center align-middle text-4xl text-black shadow-sm shadow-white transition-all duration-300 hover:text-gray-700 hover:shadow-none"
          >
            Start Over
          </Link>
          <Link
            href={"/arabic/writing-system/test"}
            className="flex h-64 w-80 items-center justify-center rounded-2xl bg-gradient-to-b from-white  to-[#D6A45C] text-center align-middle text-4xl  text-black shadow-sm shadow-white transition-all duration-300 hover:text-gray-700 hover:shadow-none"
          >
            Take a <br></br> test
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
