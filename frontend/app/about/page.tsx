import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">About 1MIN</h1>
        
        <div className="flex flex-col gap-8 text-text-secondary">
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg">
              We built 1MIN to bring back the magic of spontaneous conversations on the internet. 
              In a world of endless scrolling and curated profiles, we believe in the power of a raw, 
              unfiltered, 60-second connection.
            </p>
          </div>
          
          <div className="bg-surface-elevated p-8 rounded-2xl border border-border-subtle">
            <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
            <p className="text-lg">
              We are a small team of passionate developers and designers who love building real-time 
              communication tools that respect user privacy and promote genuine interactions.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/" className="bg-transparent border border-border-subtle text-white py-4 px-8 rounded-xl font-medium hover:bg-border-subtle transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
