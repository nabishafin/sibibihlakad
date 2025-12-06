import React from "react";
import { cn } from "@/lib/utils";

const AnimatedButton = ({
  text = "Button",
  className,
  width = "w-full", // Default to full width, but can be overridden
  textColor = "#000000",
  fillColor1 = "#FFD700", // Premium Gold Light
  fillColor2 = "#DAA520", // Premium Gold Dark
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `relative inline-block ${width} h-[48px] rounded-xl border-[2px] overflow-hidden z-10`,
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
