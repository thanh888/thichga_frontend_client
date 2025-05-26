import ExGameDetailPage from "@/pages/ex-game-detail.page";

export async function generateStaticParams() {
  // Replace this with your actual logic to fetch possible room IDs
  const roomIds = ["1", "2", "3"]; // Example: List of room IDs

  // Return an array of objects with the `id` param
  return roomIds.map((id) => ({
    id,
  }));
}
export default function ExGameDetailLayout() {
  return (
    <div>
      <ExGameDetailPage />
    </div>
  );
}
