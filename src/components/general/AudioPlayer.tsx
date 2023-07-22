import { PlayCircleFilledWhite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { HexColor } from "aws-sdk/clients/quicksight";
import React, { useEffect, useRef, useState } from "react";

interface props {
  url: string;
  color?: string;
  className?: string;
}
const AudioPlayer = ({ url, color = "#fff", className = "" }: props) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audio) audio.play();
  };

  useEffect(() => {
    if (url) {
      const audioObj = new Audio(url);
      setAudio(audioObj);
      return () => {
        audioObj.pause();
        setAudio(null);
      };
    }
  }, [url]);

  return (
    <IconButton
      style={{ color }}
      onClick={playAudio}
      className={`  transition-all duration-300 hover:opacity-50`}
    >
      <PlayCircleFilledWhite className={`${className}`} />
    </IconButton>
  );
};

export default AudioPlayer;
