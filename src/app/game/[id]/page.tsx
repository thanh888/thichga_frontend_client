import GameDetailPage from "@/pages/game-detail.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gà cựa",
};

// Add this function to generate static paths
export async function generateStaticParams() {
  // Replace this array with your actual game IDs
  const gameIds = ["1", "2", "3"]; // Example IDs

  return gameIds.map((id) => ({
    id: id,
  }));
}

export default function GameDetailLayout() {
  return <GameDetailPage />;
}
