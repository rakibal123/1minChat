import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 flex flex-col md:flex-row items-center justify-between gap-6 px-6 max-w-7xl mx-auto mt-auto border-t border-border-subtle text-text-secondary">
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
        <div className="text-2xl font-extrabold text-primary tracking-tighter">1MIN</div>
        <div className="text-sm font-medium">One minute. One conversation.</div>
        <div className="text-xs text-text-secondary/50 mt-2">© 2024 1MIN. ENCRYPTED & ANONYMOUS.</div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-wider uppercase">
        <Link href="#" className="hover:text-primary transition-colors">Product</Link>
        <span className="hidden md:inline">·</span>
        <Link href="#" className="hover:text-primary transition-colors">Safety</Link>
        <span className="hidden md:inline">·</span>
        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
        <span className="hidden md:inline">·</span>
        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
        <span className="hidden md:inline">·</span>
        <Link href="#" className="hover:text-primary transition-colors">Support</Link>
      </div>
    </footer>
  );
}
