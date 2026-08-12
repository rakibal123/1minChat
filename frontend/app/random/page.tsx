import MoodSelection from "@/components/random/MoodSelection";

export const metadata = {
  title: "What's your vibe? — 1MIN",
  description: "Choose your mood and find someone to talk to for 60 seconds.",
};

export default function RandomChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <MoodSelection />
    </main>
  );
}
