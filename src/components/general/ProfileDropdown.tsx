import React, { Dispatch, SetStateAction, useEffect } from "react";
import { navDropdown } from "./Nav";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface props {
  dropdown: navDropdown | null;
  setDropdown: Dispatch<SetStateAction<navDropdown | null>>;
}
const ProfileDropdown = ({ dropdown, setDropdown }: props) => {
  const session = useSession();

  const router = useRouter();
  return (
    <div
      className="absolute right-20 top-0 !z-[200] flex h-auto w-auto flex-col items-center justify-center space-y-8 rounded-md  bg-green-950 p-4 align-middle"
      onMouseLeave={() => setDropdown(null)}
    >
      {session.status === "authenticated" && (
        <div className="flex h-auto w-full flex-col space-y-4 rounded-lg  ">
          {session && session.data && session.data.user.name && (
            <p className="text-handwriting text-center text-lg text-green-300">
              {session.data.user.name}
            </p>
          )}
          {session && session.data && session.data.user.email && (
            <p className="text-handwriting text-center text-lg text-green-300">
              {session.data.user.email}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => void router.push(`/profile`)}
        className="h-10 w-full text-xl shadow-sm shadow-black transition-all duration-300 hover:text-yellow-300 hover:shadow-none   "
      >
        Profile
      </button>
      <button
        onClick={() => void router.push("/about-us")}
        className="h-10 w-full text-xl shadow-sm shadow-black transition-all duration-300 hover:text-yellow-300 hover:shadow-none   "
      >
        About Us
      </button>
      <button
        onClick={() => void signOut({ callbackUrl: "/authenticate" })}
        className="h-10 w-full text-xl shadow-sm shadow-black transition-all duration-300 hover:text-yellow-300 hover:shadow-none   "
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
