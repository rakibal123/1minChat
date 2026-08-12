"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOODS = [
  { id: "chill", icon: "😎", title: "Chill" },
  { id: "fun", icon: "😂", title: "Fun" },
  { id: "deep", icon: "🧠", title: "Deep" },
  { id: "curious", icon: "🤔", title: "Curious" },
  { id: "motivated", icon: "🔥", title: "Motivated" },
  { id: "latenight", icon: "🌙", title: "Late Night" },
  { id: "music", icon: "🎵", title: "Music" },
  { id: "gaming", icon: "🎮", title: "Gaming" },
  { id: "tech", icon: "💻", title: "Tech" },
  { id: "random", icon: "🎲", title: "Random" },
];

const STYLES = ["Casual", "Deep Talk", "Random"];

export default function MoodSelection() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Casual");
  const [customVibe, setCustomVibe] = useState("");

  const handleFindSomeone = () => {
    if (!selectedMood && !customVibe) return;
    // In a real app, we'd save this to global state/context or query params
    // before navigating to matchmaking
    const query = new URLSearchParams({
      mood: selectedMood || "custom",
      style: selectedStyle,
      ...(customVibe && { custom: customVibe }),
    });
    router.push(`/random/matching?${query.toString()}`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-xs font-bold tracking-[0.05em] text-accent-light uppercase mb-6">
        RANDOM CHAT
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        What's your vibe?
      </h1>
      <p className="text-text-secondary text-lg mb-10 text-center">
        Choose what you're feeling right now. We'll find someone to talk to.
      </p>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mb-8">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => {
                setSelectedMood(mood.id);
                setCustomVibe("");
              }}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 h-[80px] md:h-[90px]
                ${isSelected 
                  ? "bg-blue-darker border-primary shadow-[0_0_15px_rgba(4,116,196,0.2)]" 
                  : "bg-surface-elevated border-border-subtle hover:border-text-secondary/50"
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
              <span className="text-2xl mb-1">{mood.icon}</span>
              <span className="text-sm font-semibold">{mood.title}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full mb-8">
        <p className="text-sm text-text-secondary mb-2">Or describe your vibe</p>
        <input 
          type="text"
          value={customVibe}
          onChange={(e) => {
            setCustomVibe(e.target.value);
            if (e.target.value) setSelectedMood(null);
          }}
          placeholder="I just want someone to talk to..."
          maxLength={120}
          className="w-full bg-black border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="w-full mb-10">
        <p className="text-sm text-text-secondary mb-3">Conversation style</p>
        <div className="flex flex-wrap gap-3">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
                ${selectedStyle === style 
                  ? "bg-primary border-primary text-white" 
                  : "bg-surface-elevated border-border-subtle text-text-secondary hover:border-text-secondary/50"
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <button 
          onClick={handleFindSomeone}
          disabled={!selectedMood && !customVibe}
          className={`w-full md:w-auto min-w-[240px] font-medium py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center
            ${(!selectedMood && !customVibe)
              ? "bg-surface-elevated border border-border-subtle text-text-secondary/50 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(4,116,196,0.3)]"
            }
          `}
        >
          Find Someone <span className="ml-2">→</span>
        </button>
        <div className="mt-4 flex items-center text-sm text-text-secondary">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          You'll stay anonymous.
        </div>
      </div>
    </div>
  );
}
