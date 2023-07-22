import { Info, VolumeUp } from "@mui/icons-material";
import React, { useMemo } from "react";
import { arSymbolsNoEnglishEquiv } from "~/constants/general/symbols";
import { IntroductionSlide } from "~/server/api/routers/arabic/arabicTexts";
import AudioPlayer from "../AudioPlayer";
import { Popover } from "@mui/material";

interface props {
  slide: IntroductionSlide;
  currentSlideIndex: number;
  incrementSlide: () => void;
}

const IntroductionSlide = ({
  slide,
  currentSlideIndex,
  incrementSlide,
}: props) => {
  const [infoEl, setInfoEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInfoEl(event.currentTarget);
  };

  const handleClose = () => {
    setInfoEl(null);
  };
  const isSpecificLetter = useMemo(() => {
    if (arSymbolsNoEnglishEquiv.includes(slide.symbol)) return true;
    return false;
  }, [slide.symbol]);
  return (
    <>
      <div className="absolute left-0 top-0 ml-8 flex h-full w-1/4  flex-col justify-center align-middle ">
        <button
          onClick={handleClick}
          className="mb-auto mt-36 h-32 w-32 rounded-full bg-[#163928]/60 transition-all duration-300 hover:opacity-60 "
        >
          {" "}
          <Info className="h-14 w-14" htmlColor="#9DD" />{" "}
        </button>
        {slide.audioURL && (
          <button className="mb-36 h-32 w-32  rounded-full bg-[#163928]/60">
            {" "}
            <AudioPlayer
              className="h-14 w-14"
              color="#9DD"
              url={slide.audioURL}
            />{" "}
          </button>
        )}
      </div>
      <p className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white ">
        {slide.symbol}
      </p>

      <div className="absolute bottom-0 left-1/2 mb-8 flex w-auto  -translate-x-1/2 flex-col items-center justify-center align-middle">
        <p className="w-auto text-center text-6xl">{slide.name}</p>
        {isSpecificLetter ? (
          <p className="w-auto text-center text-xl text-[#99DDDD]">
            Unique Arabic Letter<br></br>
            {`Transliterates to  "${slide.transliteration}"`}
          </p>
        ) : (
          <p className="w-auto text-center text-3xl text-[#99DDDD]">
            {`Pronounced like "${slide.transliteration}"`}
            <br></br>
            {`In English`}{" "}
          </p>
        )}
        <button
          onClick={() => incrementSlide()}
          className="my-6  h-14  w-64 rounded-sm border-2 border-cyan-950  bg-cyan-400 text-black transition-all duration-300 hover:text-gray-800 disabled:bg-cyan-800 "
        >
          Next
        </button>
      </div>
      <Popover
        open={infoEl !== null}
        anchorEl={infoEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="h-auto w-auto  "
      >
        <p className="h-auto max-w-md !bg-cyan-300 p-2 text-black ">
          {slide.description}
        </p>
      </Popover>
    </>
  );
};

export default IntroductionSlide;
