import BetControls from "@/components/game/bet-control.game";
import BetInfo from "@/components/game/bet-info.game";
import GameHeader from "@/components/game/header.game";
import LiveStream from "@/components/game/live-stream.game";

export default function GamePage() {
  return (
    <>
      <GameHeader />
      <div className="flex flex-row items-center  w-full h-screen bg-gray-900 text-white">
        <BetInfo />
        <LiveStream />
        <BetControls />
      </div>
    </>
  );
}
