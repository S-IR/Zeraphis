import Menu from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { sidebarOptions } from "~/constants/general/sidebarConst";

const Sidebar = () => {
  const session = useSession();
  const [visible, toggle] = useState(session !== undefined);

  const sidebarStyles = useSpring({
    from: { width: 0 },
    to: { width: visible ? 220 : 0 },
    config: config.gentle,
  });

  const sidebarItemStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: visible ? 1 : 0 },
    trail: 300,
    config: { duration: 300 },
  });
  return (
    <animated.section
      style={sidebarStyles}
      className={`${
        !visible && `ml-2`
      } absolute left-0 top-[75px] z-50 flex h-auto min-h-[95vh]  flex-col items-center space-y-24 rounded-r-3xl bg-black/20  `}
    >
      <button
        onClick={() => toggle((v) => !v)}
        className="group absolute right-0 top-6 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-[#0F3120] align-middle transition-all duration-300 hover:bg-green-950"
      >
        <Menu
          htmlColor={`${visible ? "#D6A45C" : `#D6A45C`}`}
          width={20}
          height={20}
          // className={`rotate-0 transition-all duration-300 group-hover:!h-6 group-hover:!w-6`}
        />
      </button>
      {sidebarOptions.map((option) => (
        <animated.div
          style={sidebarItemStyles}
          className="group mt-12 h-12 w-4/5  min-w-[180px] items-center border-b-2 border-black "
          key={option.href}
        >
          {option.icon}
          <Link href={`${option.href}/1234`}>
            <span className="ml-4 truncate text-lg font-semibold text-white transition-all duration-300 hover:text-yellow-600 ">
              {option.text}
            </span>
          </Link>
        </animated.div>
      ))}
      <animated.div style={sidebarItemStyles} className="!mt-auto">
        <Image
          alt={"sidebar user icon"}
          width={256}
          height={256}
          src={"/sidebar-icon1.png"}
        />
      </animated.div>
    </animated.section>
  );
};

export default Sidebar;
