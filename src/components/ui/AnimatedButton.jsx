import React from "react";
import { cn } from "@/lib/utils";

const AnimatedButton = ({
  text = "Button",
  className,

  textColor = "#FFFFFF",
  fillColor1 = "#FFCE00",
  fillColor2 = "#FFB800",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-block w-[150px] h-[48px] rounded-xl border-[2px] overflow-hidden z-10",
        className
      )}
    >
      <span
        className="absolute top-0 left-[-10px] w-[60%] h-full skew-x-[35deg] -z-10"
        style={{ background: fillColor1 }}
      ></span>
      <span
        className="absolute top-0 right-[-10px] w-[60%] h-full skew-x-[35deg] -z-10"
        style={{ background: fillColor2 }}
      ></span>
      <span
        className="relative text-[18px] font-medium flex items-center justify-center h-full w-full"
        style={{
          color: textColor,
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default AnimatedButton;
