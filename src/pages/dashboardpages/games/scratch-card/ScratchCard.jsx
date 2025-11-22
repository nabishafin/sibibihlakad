import React from "react";

import { GameArea } from "@/components/ScratchCard/GameArea";
import { InfoPanel } from "@/components/ScratchCard/InfoPanel";
export function ScratchCard() {
  return (
    <div className="flex flex-col  bg-[#0e1624] text-white">
      <div className="flex flex-col md:flex-row flex-1">
        <GameArea />
        <InfoPanel />
      </div>
    </div>
  );
}
