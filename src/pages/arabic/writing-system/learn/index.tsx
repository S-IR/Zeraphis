import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect } from "react";
import { api } from "~/utils/api";

const Page: NextPage = () => {
  const res = api.arabic.voiceLines.getVoiceLines.useQuery("بَبْبَبَّ", {
    staleTime: 3600,
  });

  useEffect(() => {
    console.log("api result", res);
  }, []);

  return (
    <div className=" flex h-auto min-h-[calc(100vh-75px)] w-screen items-center justify-center align-middle ">
      <main className="relative mx-[5vw] my-[5vh] min-h-[80vh] w-[90vw] overflow-clip rounded-3xl border-8 border-[#9DD]   ">
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        />
      </main>
    </div>
  );
};

export default Page;
