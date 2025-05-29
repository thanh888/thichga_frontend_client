import GameDetailPage from "@/pages/game-detail.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gà cựa",
};

export default function GameDetailLayout() {
  return <GameDetailPage />;
}
