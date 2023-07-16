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
      className="absolute right-20 top-0 !z-[200] flex h-auto w-auto flex-col items-center justify-center rounded-md  bg-gradient-to-br from-white  to-yellow-200 align-middle text-black"
      onMouseLeave={() => setDropdown(null)}
    >
      {session.status === "authenticated" && (
        <div className="my-4 flex h-auto w-full flex-col space-y-4 rounded-lg text-lg  ">
          {session && session.data && session.data.user.name && (
            <p className="text-handwriting m-4 text-center  text-yellow-800 ">
              {session.data.user.name}
            </p>
          )}
          {session && session.data && session.data.user.email && (
            <p className="text-handwriting m-4 text-center text-sm  text-yellow-800/70 ">
              {session.data.user.email}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => void router.push(`/profile`)}
        className="h-10 w-full bg-yellow-300/30 text-xl transition-all  duration-300 hover:bg-yellow-400/60  hover:shadow-none  "
      >
        Profile
      </button>
      <button
        onClick={() => void router.push("/about-us")}
        className="h-10 w-full bg-yellow-100/30 text-xl transition-all duration-300 hover:bg-yellow-200  hover:shadow-none  "
      >
        About Us
      </button>
      <button
        onClick={() => void signOut({ callbackUrl: "/authenticate" })}
        className="h-10 w-full bg-yellow-300/30 text-xl  transition-all duration-300 hover:bg-yellow-400/60   hover:shadow-none "
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
