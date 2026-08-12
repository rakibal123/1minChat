"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-border-subtle flex justify-between items-center px-6 py-4 max-w-7xl mx-auto left-0 right-0">
        <Link href="/" className="text-2xl font-extrabold text-primary tracking-tighter cursor-pointer" onClick={closeMenu}>
          1MIN
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-primary font-bold border-b-2 border-primary pb-1 transition-all cursor-pointer">Home</Link>
          <Link href="/how-it-works" className="text-text-secondary hover:text-primary transition-colors cursor-pointer">How It Works</Link>
          <Link href="/safety" className="text-text-secondary hover:text-primary transition-colors cursor-pointer">Safety</Link>
          <Link href="/about" className="text-text-secondary hover:text-primary transition-colors cursor-pointer">About</Link>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="hidden md:inline">1,284 online</span>
            <span className="md:hidden">1.2K online</span>
          </div>
          
          <Link href="/random" className="hidden md:flex bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors cursor-pointer">
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary p-2 -mr-2 cursor-pointer relative z-[60]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Drawer (65% width sliding from right) */}
      <div 
        className={`fixed top-0 right-0 h-full w-[65%] z-50 bg-[#151a2f] border-l border-border-subtle shadow-2xl pt-24 px-6 flex flex-col md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col space-y-6 text-xl font-bold">
          <Link href="/" className="text-primary border-b border-border-subtle pb-4 cursor-pointer" onClick={closeMenu}>Home</Link>
          <Link href="/how-it-works" className="text-white hover:text-primary border-b border-border-subtle pb-4 cursor-pointer transition-colors" onClick={closeMenu}>How It Works</Link>
          <Link href="/safety" className="text-white hover:text-primary border-b border-border-subtle pb-4 cursor-pointer transition-colors" onClick={closeMenu}>Safety</Link>
          <Link href="/about" className="text-white hover:text-primary border-b border-border-subtle pb-4 cursor-pointer transition-colors" onClick={closeMenu}>About</Link>
        </div>
        
        <div className="mt-auto pb-12 flex flex-col gap-4">
          <Link 
            href="/random" 
            className="bg-primary text-white py-4 rounded-xl font-medium flex items-center justify-center w-full shadow-[0_0_20px_rgba(4,116,196,0.2)] cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={closeMenu}
          >
            Start Random Chat
          </Link>
          <Link 
            href="/invite/create" 
            className="bg-transparent border border-border-subtle text-white py-4 rounded-xl font-medium flex items-center justify-center w-full cursor-pointer hover:bg-border-subtle transition-colors"
            onClick={closeMenu}
          >
            Invite Someone
          </Link>
        </div>
      </div>
    </>
  );
}
