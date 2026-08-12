import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6 mt-8 md:mt-16 w-full">
          <div className="text-xs font-bold tracking-[0.05em] text-primary uppercase bg-surface-elevated px-4 py-1.5 rounded-full border border-border-subtle">
            Anonymous Chat
          </div>
          
          <h1 className="text-5xl md:text-[80px] font-extrabold tracking-tight leading-tight max-w-4xl">
            One minute.<br className="md:hidden" />
            <span className="text-accent-light md:ml-4">One conversation.</span>
          </h1>
          
          <p className="text-base md:text-xl text-text-secondary max-w-2xl font-normal leading-relaxed mb-8">
            Talk to someone new for 60 seconds — or create a private chat and talk without limits.
          </p>
        </section>

        {/* Action Cards */}
        <section id="how-it-works" className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-16">
          
          {/* Card 1: Meet Someone */}
          <div className="group flex flex-col bg-surface-elevated border border-border-subtle rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
            
            <div className="z-10 w-full flex justify-between items-start mb-12">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
                </svg>
              </div>
              <span className="text-xs font-bold tracking-[0.05em] text-accent-light uppercase bg-blue-dark px-3 py-1 rounded-full">
                Random
              </span>
            </div>

            <div className="z-10 mt-auto w-full">
              <div className="text-xs font-bold tracking-[0.05em] text-text-secondary uppercase mb-2">
                Random 1-Minute Chat
              </div>
              <h2 className="text-3xl font-semibold mb-4">Meet Someone</h2>
              <Link 
                href="/random" 
                className="bg-primary text-white font-medium py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center w-full shadow-[0_0_20px_rgba(4,116,196,0.2)]"
              >
                Start Random Chat 
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2: Invite Someone */}
          <div className="group flex flex-col bg-surface-elevated border border-border-subtle rounded-2xl p-8 hover:border-accent-teal/50 transition-colors duration-300 relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
            
            <div className="z-10 w-full flex justify-between items-start mb-12">
              <div className="w-12 h-12 rounded-full bg-accent-teal/20 flex items-center justify-center text-accent-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <span className="text-xs font-bold tracking-[0.05em] text-text-secondary uppercase border border-border-subtle bg-surface-elevated px-3 py-1 rounded-full">
                Private
              </span>
            </div>

            <div className="z-10 mt-auto w-full">
              <div className="text-xs font-bold tracking-[0.05em] text-text-secondary uppercase mb-2">
                Private Chat · No Limit
              </div>
              <h2 className="text-3xl font-semibold mb-4">Invite Someone</h2>
              <Link 
                href="/invite/create" 
                className="bg-transparent border border-border-subtle text-text-secondary font-medium py-4 px-6 rounded-xl hover:bg-border-subtle hover:text-white transition-colors duration-300 flex items-center justify-center w-full"
              >
                Create Invite Link 
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </section>

        {/* Stats Section (Desktop) */}
        <section id="safety" className="hidden md:flex w-full max-w-5xl border-y border-border-subtle py-8 mb-16 justify-between items-center text-center">
          <div className="flex-1">
            <p className="text-3xl font-semibold">1,284+</p>
            <p className="text-xs font-bold tracking-wider text-text-secondary uppercase mt-1">Online Now</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-semibold">32K+</p>
            <p className="text-xs font-bold tracking-wider text-text-secondary uppercase mt-1">Chats Today</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-semibold">128+</p>
            <p className="text-xs font-bold tracking-wider text-text-secondary uppercase mt-1">Countries</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-semibold text-accent-teal">100%</p>
            <p className="text-xs font-bold tracking-wider text-text-secondary uppercase mt-1">Anonymous</p>
          </div>
        </section>

        {/* Mobile Mock Chat Preview (Visible mainly on mobile as per design) */}
        <section className="md:hidden w-full flex flex-col gap-8 mb-12">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div className="text-base text-white font-medium">Someone is waiting to talk.</div>
          </div>
          
          <div className="bg-surface-elevated border border-border-subtle rounded-xl overflow-hidden flex flex-col h-[320px] shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-border-subtle bg-[#2f3449]">
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider">Vibe #4821</span>
                <div className="flex items-center gap-1 text-[10px] text-primary mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Online
                </div>
              </div>
              <div className="text-[10px] font-bold tracking-wider text-accent-light bg-blue-dark px-3 py-1 rounded-full border border-primary/20">
                00:47
              </div>
            </div>
            
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-surface-elevated">
              <div className="flex justify-start">
                <div className="bg-blue-darker text-text-secondary text-sm py-2 px-4 rounded-xl rounded-tl-sm max-w-[85%]">
                  Hey 👋
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-white text-sm py-2 px-4 rounded-xl rounded-tr-sm max-w-[85%]">
                  Hey! What's your vibe tonight?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-blue-darker text-text-secondary text-sm py-2 px-4 rounded-xl rounded-tl-sm max-w-[85%]">
                  Honestly? Just bored 😂
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-border-subtle bg-[#2f3449]">
              <div className="bg-black border border-blue-darker rounded-xl flex items-center px-4 py-2 opacity-50">
                <span className="text-sm text-text-secondary flex-1">Type a message...</span>
                <svg className="w-5 h-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-6 mt-4">
            <h2 className="text-3xl font-bold">Got a minute?<br/>Someone is waiting.</h2>
            <div className="w-full flex flex-col gap-3">
              <Link href="/random" className="bg-primary text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center w-full">
                Start Random Chat
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/invite/create" className="bg-transparent border border-border-subtle text-text-secondary font-medium py-4 px-6 rounded-xl flex items-center justify-center w-full">
                Invite Someone
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <div id="about"></div>
      <Footer />
    </div>
  );
}
