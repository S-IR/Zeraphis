import { FacebookOutlined, Google } from "@mui/icons-material";
import React from "react";
import { FcGoogle } from "react-icons/fc";

interface props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  w?: "sm" | "md" | "lg" | "auto" | "full";
  h?: "sm" | "md" | "lg" | "auto";
  disabled?: boolean;
}

const heightObj = {
  sm: "h-10",
  md: "h-20",
  lg: "h-32",
  auto: "h-auto",
};
const widthObj = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  auto: "w-auto",
  full: "w-full",
};

/**
 * A component styled after the Google login button

 */
const GoogleButton = ({ text, onClick, w, h, disabled }: props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` flex ${w ? widthObj[w] : `w-56`} ${
        h ? heightObj[h] : "h-18"
      }  rounded-md bg-white p-2 font-['Helvetica'] text-black/60 transition-all duration-300 hover:text-black disabled:bg-gray-600  `}
    >
      <FcGoogle className="mr-2 h-6 w-6" />
      <p>{text}</p>
    </button>
  );
};

export default GoogleButton;
