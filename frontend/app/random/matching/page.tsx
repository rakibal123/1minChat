"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function MatchmakingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dots, setDots] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const mood = searchParams.get("mood") || "casual";
  const custom = searchParams.get("custom") || "";
  const style = searchParams.get("style") || "Casual";

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timeInterval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // For visual demo purposes, automatically "find" someone after a few seconds
  useEffect(() => {
    if (elapsed > 3) {
      router.push("/chat");
    }
  }, [elapsed, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <div className="flex flex-col items-center w-full max-w-md animate-in fade-in duration-700">
        
        {/* Radar / Pulse Animation */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute inset-4 rounded-full border border-primary/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
          <div className="absolute inset-8 rounded-full border border-primary/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
          <div className="w-24 h-24 bg-surface-elevated border border-primary/50 rounded-full z-10 flex items-center justify-center shadow-[0_0_30px_rgba(4,116,196,0.5)]">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Finding someone{dots}</h1>
        <p className="text-text-secondary mb-8 text-center">
          Looking for a match based on your vibe:<br/>
          <span className="font-semibold text-white capitalize">{custom || mood}</span> ({style})
        </p>

        <p className="text-sm text-text-secondary/60 mb-12">Time elapsed: {elapsed}s</p>

        <button 
          onClick={() => router.push("/random")}
          className="bg-transparent border border-border-subtle text-text-secondary font-medium py-3 px-8 rounded-xl hover:bg-surface-elevated transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}

export default function MatchmakingPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </main>
    }>
      <MatchmakingInner />
    </Suspense>
  );
}
