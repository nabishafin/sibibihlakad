import React from "react";
import { HowToPlay } from "./HowToPlay";
import { GameHistory } from "./GameHistory";

export function InfoPanel() {
  return (
    <div className="w-full md:w-[360px] bg-[#0e1624] border-l border-[#1e2a3a] p-6">
      <div className="flex flex-col h-full gap-6">
        <HowToPlay />
        <GameHistory />
      </div>
    </div>
  );
}
