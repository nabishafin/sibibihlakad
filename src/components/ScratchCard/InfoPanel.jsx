import React from "react";
import { HowToPlay } from "./HowToPlay";
import { GameHistory } from "./GameHistory";

export function InfoPanel() {
  return (
    <>
      <HowToPlay />
      <GameHistory />
    </>
  );
}
