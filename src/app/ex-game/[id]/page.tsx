import ExGameDetailPage from "@/pages/ex-game-detail.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gà Đòn",
};

export default function ExGameDetailLayout() {
  return (
    <div className="bg-black h-full">
      <ExGameDetailPage />
    </div>
  );
}
