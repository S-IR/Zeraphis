import React, { Dispatch, SetStateAction } from "react";
import { navDropdown } from "./Nav";

interface props {
  dropdown: navDropdown | null;
  setDropdown: Dispatch<SetStateAction<navDropdown | null>>;
}
const ProfileDropdown = ({ dropdown, setDropdown }: props) => {
  return (
    <div
      className="b absolute -bottom-72 right-20 flex h-80 w-52 flex-col items-center justify-center space-y-16 rounded-lg border-2 border-white/20 bg-green-950/40 align-middle"
      onMouseLeave={() => setDropdown(null)}
    >
      <button className="h-10 w-full text-xl ">Profile</button>
      <button className="h-10 w-full text-xl ">About Us</button>
      <button className="h-10 w-full text-xl ">Logout</button>
    </div>
  );
};

export default ProfileDropdown;
