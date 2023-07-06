import React, { useEffect, useMemo, useState } from "react";
import { useSpring, animated, useTransition, config } from "react-spring";
import { QuizOptionIndex } from "~/constants/arabic/quizzes";

export type QuizButtonStatus =
  | "correct"
  | "incorrect"
  | "neither-correct-nor-incorrect"
  | null;
interface props {
  status: QuizButtonStatus;
  text: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const determineColor = (correct: QuizButtonStatus | null) => {
  switch (correct) {
    case null:
      return "#FFEC97";
    case "correct":
      return "#4ade80";
    case "incorrect":
      return "#DC2626";
    case "neither-correct-nor-incorrect":
      return "#333333";
  }
};

const getShadow = (isFlickering: boolean, status: QuizButtonStatus) => {
  if (isFlickering) {
    return `0px 0px 12px 12px ${
      status === "correct"
        ? `rgba(74, 222, 128, 0.5)`
        : `rgba(220, 38, 38, 0.5)`
    }`;
  } else {
    return `0px 0px 0px 0px rgba(0, 0, 0, 0.1)`;
  }
};

const AnswerButton = ({ status, text, disabled, handleClick }: props) => {
  const color = determineColor(status);
  const [isFlickering, setIsFlickering] = useState(false);

  useEffect(() => {
    if (status === "neither-correct-nor-incorrect") return;
    if (status === "correct" || status === "incorrect") {
      setIsFlickering(true);
    } else {
      if (status === null) setIsFlickering(false);
    }
  }, [status]);

  const boxShadow = useMemo(
    () => getShadow(isFlickering, status),
    [status, isFlickering]
  );
  useEffect(() => {
    if (status === "correct" || status === "incorrect") {
      const flickerInterval = setInterval(() => {
        setIsFlickering((prevState) => !prevState);
      }, 100);

      setTimeout(() => {
        clearInterval(flickerInterval);
        setIsFlickering(false);
      }, 3000);

      return () => {
        clearInterval(flickerInterval);
      };
    }
  }, [status]);

  const buttonProps = useSpring({
    backgroundColor: status === null ? "#FFEC97" : color,
  });

  const shadowProps = useSpring({
    boxShadow,
    config: { ...config.gentle, duration: 400 },
  });
  const transitions = useTransition(text, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <animated.button
      onClick={handleClick}
      disabled={disabled}
      className={
        "group relative flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97]  align-middle transition-all duration-300"
      }
      style={buttonProps}
    >
      <animated.div
        style={shadowProps}
        className="absolute left-0 top-0 h-full w-full"
      ></animated.div>
      {transitions((pStyle, text) => (
        <animated.p
          style={pStyle}
          className={`absolute left-1/2  top-1/2  -translate-x-1/2 -translate-y-1/2 ${
            text.length > 10 ? `text-2xl` : `text-4xl`
          } text-black transition-all duration-300 ${
            !disabled ? "group-hover:text-yellow-700" : ""
          }  `}
        >
          {text}
        </animated.p>
      ))}
    </animated.button>
  );
};
export default AnswerButton;
