import React, { useMemo } from "react";
import { useSpring, animated, config } from "react-spring";

interface props {
  symbol: string;
  i: number;
  currentSymbolIndex: number;
  totalLen: number;
}

const determineColor = (i: number, currentSymbolIndex: number): string => {
  if (i < currentSymbolIndex) return "#5CFF76";
  if (i === currentSymbolIndex) return "#FFE248";
  if (i === currentSymbolIndex + 1) return "#9DD";
  return "#000";
};

const SymbolInProgression = ({
  currentSymbolIndex,
  i,
  symbol,
  totalLen,
}: props) => {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const color = useMemo(
    () => determineColor(i, currentSymbolIndex),
    [currentSymbolIndex]
  );
  const bgStyle = useSpring({
    backgroundColor: status === null ? "#000000" : color,
    config: config.gentle,
  });
  return (
    <animated.div
      style={bgStyle}
      className={`${
        i === 0
          ? `rounded-bl-3xl `
          : i === totalLen - 1
          ? `rounded-br-3xl`
          : `rounded-none`
      }  flex  h-16 w-8 items-center justify-center border-2 border-[#9DD]/10  p-1 align-middle text-black  `}
    >
      {symbol}
    </animated.div>
  );
};

export default SymbolInProgression;
