import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DrawingSlide } from "~/server/api/routers/arabic/arabicTexts";
import resemble from "resemblejs";
import html2canvas from "html2canvas";

interface props {
  slide: DrawingSlide;
  currentSlideIndex: number;
  incrementSlide: () => void;
}

const DrawSlide = ({ currentSlideIndex, incrementSlide, slide }: props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const referenceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  let drawing = false;
  const referenceImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (parentRef.current) {
      setCanvasHeight(parentRef.current.offsetHeight / 2);
      setCanvasWidth((parentRef.current.offsetWidth * 9) / 10);

      // Create reference image
      if (referenceCanvasRef === null || referenceCanvasRef.current === null)
        return;
      const referenceContext = referenceCanvasRef.current.getContext("2d");
      if (referenceContext === null) return;
    }
  }, [parentRef, slide]);
  useLayoutEffect(() => {
    // Create reference image
    if (referenceCanvasRef.current !== null) {
      const referenceContext = referenceCanvasRef.current.getContext("2d");
      if (referenceContext !== null) {
        referenceContext.font = "140px Arial";
        referenceContext.fillText(
          slide.symbol,
          canvasWidth / 2,
          canvasHeight / 2
        );
        referenceImage.current = new Image();
        referenceImage.current.src = referenceCanvasRef.current.toDataURL();

        // Allow click events to pass through to the reference image
        referenceImage.current.style.pointerEvents = "none";
        referenceImage.current.style.position = "absolute";
        referenceImage.current.style.opacity = "0.3"; // Reduce opacity
        referenceImage.current.style.top = "0";
        referenceImage.current.style.left = "0";
      }
    }
  }, [referenceCanvasRef, slide, canvasWidth, canvasHeight]);

  const setUpCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Initialize drawing parameters
    context.fillStyle = "black";
    context.lineWidth = 10;
    context.lineCap = "round";
    drawing = false;
  };

  useEffect(() => {
    setUpCanvas();
  }, [canvasWidth, canvasHeight]); // Re-initialize every time the sizes change

  // Drawing functions
  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!drawing || !context) return;

    context.strokeStyle = "#444";
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    drawing = true;
    draw(event);
  };

  const finishDrawing = () => {
    drawing = false;
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.beginPath();

    // Upon finishing drawing, compare it with the reference image.
    const drawnImageUrl = canvas.toDataURL();
    if (!parentRef.current || !parentRef) return;

    if (!referenceImage || !referenceImage.current) return;

    resemble(drawnImageUrl)
      .compareTo(referenceImage.current.src)
      .ignoreColors() // Compare only shapes, not colors
      .onComplete((data) => {
        if (Number(data.misMatchPercentage) <= 10) {
          incrementSlide();
        }
      });
  };

  return (
    <div
      ref={parentRef}
      className="relative flex h-full w-full flex-col rounded-xl   px-6 align-middle "
    >
      <h2 className=" mt-20 text-center  text-6xl  text-cyan-300">
        {" "}
        {`Draw the letter  "${slide.symbol}"`}{" "}
      </h2>
      <canvas
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cyan-200"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        width={canvasWidth}
        height={canvasHeight}
      />
      <canvas
        className=" pointer-events-none absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cyan-200   opacity-50 "
        ref={referenceCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
};

export default DrawSlide;
