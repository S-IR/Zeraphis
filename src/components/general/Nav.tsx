import { AccountCircle } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { navLinks } from "~/constants/general/navConstants";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import PuffLoader from "react-spinners/PuffLoader";
import { config, useTransition, animated } from "react-spring";
import ProfileDropdown from "./ProfileDropdown";
import { duration } from "@mui/material";
export type navDropdown = "profile";
const renderProfileIcon = (
  status: "authenticated" | "loading" | "unauthenticated",
  sessionData: Session | null
) => {
  switch (status) {
    case "authenticated":
      if (sessionData === null) {
        return <PuffLoader size={40} />;
      } else if (!sessionData.user.image) {
        return <AccountCircle width={40} height={40} />;
      } else {
        return (
          <Image
            src={sessionData.user.image}
            alt={`Profile picture for ${sessionData.user.name} at ${sessionData.user.email}`}
            width={40}
            height={40}
            className="rounded-full"
          />
        );
      }
    case "unauthenticated":
      return <AccountCircle width={40} height={40} />;
    case "loading":
      return <PuffLoader size={40} />;
    default:
      return <></>;
  }
};

const Nav = () => {
  const [dropdown, setDropdown] = useState<null | "profile">(null);
  const session = useSession();

  const [transitions, api] = useTransition(dropdown, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.gentle, duration: 200 },
  }));
  useEffect(() => {
    api.start();
  }, [dropdown]);
  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <nav className="sticky left-0 top-0 flex h-[75px] items-center justify-center gap-64 ">
      <div className="mx-4 flex h-full items-center">
        <Image alt={"Zeraphis logo"} src={"/logo.png"} width={75} height={75} />
      </div>

      <div className="mx-4 flex w-auto items-center space-x-32">
        {navLinks.map((nav) => (
          <Link href={nav.href} key={nav.href}>
            <span className="font-serif">{nav.name}</span>
          </Link>
        ))}
      </div>
      {session.status === "authenticated" ? (
        <button
          onMouseEnter={() => {
            if (session.status === "authenticated") setDropdown("profile");
          }}
          className="ml-auto mr-3"
        >
          {renderProfileIcon(session.status, session.data)}
        </button>
      ) : (
        <div className="ml-auto mr-16 flex space-x-16 font-handwriting">
          <Link href={"/authenticate?form=sign-up"}>
            <span>Sign Up</span>
          </Link>

          <Link href={"/authenticate?form=login"}>
            <span>Login</span>
          </Link>
        </div>
      )}

      {transitions((style, item) => (
        <animated.div
          style={style}
          className={"absolute bottom-0 right-0 w-full"}
        >
          {item === "profile" && (
            <ProfileDropdown dropdown={dropdown} setDropdown={setDropdown} />
          )}
        </animated.div>
      ))}
    </nav>
  );
};

export default Nav;
