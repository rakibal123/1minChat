import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Safety & Privacy</h1>
        
        <div className="flex flex-col gap-8 text-text-secondary">
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-accent-teal mb-4">100% Anonymous</h2>
            <p className="text-lg">We don't ask for your name, email, or any personal information. You are completely anonymous when using 1MIN.</p>
          </div>
          
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-accent-teal mb-4">No Chat Logs</h2>
            <p className="text-lg">Once a conversation ends, it is gone forever. We do not store any chat logs on our servers.</p>
          </div>
          
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-accent-teal mb-4">Report & Block</h2>
            <p className="text-lg">If someone makes you uncomfortable, you can instantly end the chat and block them from matching with you again.</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/random" className="bg-primary text-white py-4 px-8 rounded-xl font-medium shadow-[0_0_20px_rgba(4,116,196,0.2)]">
            Start Chatting Safely
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
