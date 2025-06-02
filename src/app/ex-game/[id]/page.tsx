import ExGameDetailPage from "@/pages/ex-game-detail.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gà Đòn",
};

// Add this function to generate static paths
export async function generateStaticParams() {
  // Replace this array with your actual game IDs
  const gameIds = ["1", "2", "3"]; // Example IDs

  return gameIds.map((id) => ({
    id: id,
  }));
}

export default function ExGameDetailLayout() {
  return (
    <div className="bg-black h-full">
      <ExGameDetailPage />
    </div>
  );
}
