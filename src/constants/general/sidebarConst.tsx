import { Book, Forward10, Leaderboard } from "@mui/icons-material";

export const sidebarOptions = [
  {
    icon: <Forward10 htmlColor="#D6A45C" width={20} height={20} />,
    text: "My Repetitions",
    href: "/repetitions",
  },
  {
    icon: <Book htmlColor="#D6A45C" width={20} height={20} />,
    text: "My Progress",
    href: "/progress",
  },
  {
    icon: <Leaderboard htmlColor="#D6A45C" width={20} height={20} />,
    text: "Leaderboards",
    href: "/leaderboards",
  },
] as const;
