"use client";
export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

function InviteInner() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const isHost = searchParams.get("host") === "true";
  const inviteId = params.id as string;
  
  const [status, setStatus] = useState<"checking" | "waiting" | "joining" | "invalid">("checking");
  const [error, setError] = useState("");
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    async function checkInvite() {
      try {
        if (isHost) {
          setStatus("waiting");
          return;
        }

        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const API_URL = rawApiUrl.replace(/\/+$/, "");
        const res = await fetch(`${API_URL}/api/invites/${inviteId}`);
        if (!res.ok) {
          const data = await res.json();
          setStatus("invalid");
          setError(data.error || "This invite link is invalid or has already been used.");
          return;
        }

        setStatus("joining");
        setTimeout(() => {
          router.push(`/chat?invite=${inviteId}`);
        }, 1500);

      } catch (err) {
        setStatus("invalid");
        setError("Failed to verify the secure link. Please try again.");
      }
    }
    
    checkInvite();
  }, [inviteId, isHost, router]);

  // Host simulates someone joining
  useEffect(() => {
    if (status === "waiting") {
      const timer = setTimeout(() => {
        router.push(`/chat?invite=${inviteId}`);
      }, 5000); // simulate someone joining after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [status, inviteId, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-md text-center animate-in fade-in duration-500">
        
        {status === "checking" && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
            <h1 className="text-xl font-medium text-text-secondary">Verifying secure link...</h1>
          </div>
        )}

        {status === "waiting" && (
          <div className="flex flex-col items-center p-8 bg-surface-elevated border border-border-subtle rounded-2xl shadow-xl">
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent-teal/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-accent-teal/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
              <div className="w-12 h-12 bg-black border border-accent-teal/50 rounded-full z-10 flex items-center justify-center shadow-[0_0_20px_rgba(74,181,181,0.4)]">
                <svg className="w-5 h-5 text-accent-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-3">Waiting for guest...</h1>
            <p className="text-text-secondary mb-8">
              Keep this page open. The chat will start automatically when your guest joins.
            </p>
            
            <button 
              onClick={() => router.push("/")}
              className="text-sm text-text-secondary hover:text-white transition-colors"
            >
              Cancel Invite
            </button>
          </div>
        )}

        {status === "joining" && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Connecting...</h1>
            <p className="text-text-secondary">Securing your private room.</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex flex-col items-center p-8 bg-surface-elevated border border-border-subtle rounded-2xl">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3">Link Invalid</h1>
            <p className="text-text-secondary mb-8">
              {error}
            </p>
            <Link 
              href="/"
              className="bg-primary text-white font-medium py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}

export default function InviteWaitingRoom() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </main>
    }>
      <InviteInner />
    </Suspense>
  );
}
