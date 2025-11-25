import React from "react";

import { GameArea } from "@/components/ScratchCard/GameArea";
import { InfoPanel } from "@/components/ScratchCard/InfoPanel";
export function ScratchCard() {
  return (
    <div className="flex flex-col bg-[#0e1624] text-white rounded-2xl">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col md:flex-row overflow-auto">
          <GameArea />
          <div className="md:w-[500px] md:ml-6 mt-6 md:mt-0 p-6 space-y-6">
            <InfoPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
