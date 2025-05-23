import { UserProvider } from "@/contexts/user-context";
import GameDetailPage from "@/pages/game-detail.page";

export default function GameDetailLayout() {
  return (
    <UserProvider>
      <GameDetailPage />
    </UserProvider>
  );
}
