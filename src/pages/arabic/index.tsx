import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page: NextPage = () => {
  return (
    <div className="flex h-[calc(100vh-75px)] w-full ">
      <div className="w-none my-auto ml-16 h-min w-min rounded-full shadow-2xl shadow-black/40 lg:w-1/4">
        <Image
          alt={"banner image for the Arabic language section front page"}
          src={"/arabic/banner.png"}
          width={624}
          height={980}
          className="rounded-full"
        />
      </div>
      <div className="mt-32 flex w-full flex-col items-center  space-y-24 lg:w-3/4 ">
        <h1 className="let text-center font-serif text-6xl text-yellow-600 ">
          Explore Islam deeper through <br></br> learning Arabic
        </h1>
        <p className="text-center">
          If you already know the Arabic alphabet you can continue to learning
          Arabic through texts. <br></br>
          If not, no worries. You can start learning by learning the alphabet
        </p>
        <div className="!mb-20 !mt-auto flex space-x-16">
          <Link
            href={"/arabic/writing-system"}
            className="flex h-64 w-80 items-center justify-center rounded-2xl bg-gradient-to-b from-white  to-[#D6A45C] text-center align-middle text-4xl text-black shadow-sm shadow-white transition-all duration-300 hover:text-gray-700 hover:shadow-none"
          >
            Learn the <br></br> writing system
          </Link>
          <Link
            href={"/arabic/texts"}
            className="flex h-64 w-80 items-center justify-center rounded-2xl bg-gradient-to-b from-white  to-[#D6A45C] text-center align-middle text-4xl  text-black shadow-sm shadow-white transition-all duration-300 hover:text-gray-700 hover:shadow-none"
          >
            Learn the <br></br> language
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
