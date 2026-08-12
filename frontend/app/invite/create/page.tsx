"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateInvitePage() {
  const router = useRouter();
  const [inviteId, setInviteId] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(true);

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    async function createInvite() {
      try {
        const res = await fetch("http://localhost:5000/api/invites", { 
          method: "POST",
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error("Backend returned " + res.status);
        const data = await res.json();
        if (data.code) {
          setInviteId(data.code);
        }
      } catch (err: any) {
        console.error("Failed to generate invite", err);
        setInviteId("ERROR_COULD_NOT_CONNECT_TO_BACKEND");
      } finally {
        setGenerating(false);
      }
    }
    
    createInvite();
  }, []);

  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/invite/${inviteId}` : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-lg p-8 md:p-10 bg-surface-elevated border border-border-subtle rounded-2xl animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
        
        <div className="text-xs font-bold tracking-[0.05em] text-accent-teal uppercase mb-6 flex items-center">
          <span className="w-2 h-2 rounded-full bg-accent-teal mr-2 animate-pulse"></span>
          PRIVATE · NO LIMIT
        </div>

        {generating ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-text-secondary">Generating secure link...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Invite Link</h1>
              <p className="text-text-secondary">
                Send this to one person. The link expires once claimed.
              </p>
            </div>

            <div className="bg-black border border-border-subtle rounded-xl p-4 flex items-center justify-between gap-4">
              <code className="text-sm md:text-base text-white truncate flex-1">
                {inviteLink}
              </code>
              <button 
                onClick={handleCopy}
                className={`shrink-0 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copied 
                    ? "bg-accent-teal/20 text-accent-teal border border-accent-teal/50" 
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={() => router.push(`/invite/${inviteId}?host=true`)}
                className="w-full py-4 rounded-xl font-medium border border-border-subtle text-white bg-blue-darker hover:border-primary transition-colors flex items-center justify-center"
              >
                Go to Waiting Room <span className="ml-2">→</span>
              </button>
              
              <Link 
                href="/" 
                className="w-full py-3 text-center text-sm text-text-secondary hover:text-white transition-colors"
              >
                Cancel and return home
              </Link>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-accent-light/5 border border-accent-light/10 text-xs text-text-secondary">
              <strong className="text-accent-light block mb-1">Security Note</strong>
              This chat room is not monitored and has no time limit. The link is single-use and will self-destruct once your guest joins.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
