import React from 'react';
import { Heart } from 'lucide-react';
import HeroSection from './components/HeroSection';
import MusicCreationCard from './components/MusicCreationCard';

export default function App() {
  React.useEffect(() => {
    console.log("Melodia IA App montado.");
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary selection:bg-brand-accent/30 selection:text-brand-accent overflow-x-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#5c1d2e] rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#3a1a4a] rounded-full blur-[150px] opacity-30" />
      </div>

      {/* Navigation Area */}
      <nav className="relative z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <span className="text-brand-secondary uppercase tracking-[0.3em] text-xs font-bold">Melodia IA</span>
            <div className="h-[1px] w-12 bg-brand-accent mt-2 transition-all group-hover:w-full"></div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-brand-label">
            <a href="#" className="hover:text-brand-accent transition-colors">Como funciona</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Estilos</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Depoimentos</a>
            <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-lg hover:bg-white/10 transition-all">Suporte</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <HeroSection />
          <MusicCreationCard />
        </div>
      </main>

      <footer className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-brand-label uppercase tracking-[0.2em] font-bold">
          <div className="flex items-center gap-8">
            <span>© 2026 Melodia IA</span>
            <a href="#" className="hover:text-brand-primary">Privacidade & Termos</a>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-brand-accent fill-current" />
            <span>Suporte Premium</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
