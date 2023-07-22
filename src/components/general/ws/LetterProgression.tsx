import React, { useMemo } from "react";
import { arSymbols, grSymbols, hbSymbols } from "~/constants/general/symbols";
import { LearningLang } from "~/constants/general/types";
import SymbolInProgression from "./SymbolInProgression";

interface props {
  lang: LearningLang;
  currentSlideIndex: number;
  currentSymbolIndex: number;
}

const getLangSymbols = (lang: LearningLang) => {
  switch (lang) {
    case "ar":
      return arSymbols;
    case "hb":
      return hbSymbols;
    case "kn":
      return grSymbols;
  }
};
const LetterProgression = ({
  lang,
  currentSlideIndex,
  currentSymbolIndex,
}: props) => {
  const symbolsArr = useMemo(() => getLangSymbols(lang), [lang]);

  return (
    <section className="absolute -top-8 left-1/2 flex h-32 w-auto -translate-x-1/2 items-center justify-center align-middle ">
      {symbolsArr.map((symbol, i) => (
        <SymbolInProgression
          currentSymbolIndex={currentSymbolIndex}
          symbol={symbol}
          i={i}
          key={symbol}
          totalLen={symbolsArr.length}
        />
      ))}
    </section>
  );
};

export default LetterProgression;
