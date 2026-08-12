import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">How 1MIN Works</h1>
        
        <div className="flex flex-col gap-8 text-text-secondary">
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-white mb-4">1. Choose Your Vibe</h2>
            <p className="text-lg">Select what you're looking for—whether you just want to listen, vent, or have a casual chat. This helps us match you with someone who is on the same wavelength.</p>
          </div>
          
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-white mb-4">2. Talk for 60 Seconds</h2>
            <p className="text-lg">Every random conversation has a strict 60-second limit. It's fast, low-pressure, and completely anonymous.</p>
          </div>
          
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-white mb-4">3. Extend or Move On</h2>
            <p className="text-lg">If you and your partner are clicking, you can both click "+60s" to add another minute to the clock. If not, the chat disappears forever.</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/random" className="bg-primary text-white py-4 px-8 rounded-xl font-medium shadow-[0_0_20px_rgba(4,116,196,0.2)]">
            Try It Now
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
