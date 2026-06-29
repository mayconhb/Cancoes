import { SongPreview } from '../types';
import { CreditCard, ShieldCheck, Star } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface StepPreviewPlayerProps {
  preview: SongPreview;
  onBuy: () => void;
}

export default function StepPreviewPlayer({ preview, onBuy }: StepPreviewPlayerProps) {
  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1 bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-accent/20">
          <Star className="w-3 h-3 fill-current" /> Prévia Criada com Sucesso
        </div>
        <h3 className="text-2xl font-serif italic text-brand-secondary tracking-tight">
          "{preview.title}"
        </h3>
      </div>

      <AudioPlayer url={preview.audioUrl} />

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-brand-label text-xs uppercase tracking-widest font-bold">Sua música completa</span>
          <span className="text-brand-primary font-serif font-bold text-xl">R$ 47,90</span>
        </div>
        
        <ul className="text-[11px] text-brand-muted space-y-2 list-none">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Arquivo MP3 de alta qualidade
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Letra completa em PDF
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Acesso vitalício para download
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onBuy}
          className="w-full bg-brand-accent hover:bg-[#c49f27] text-brand-bg font-bold py-4 rounded-xl shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
        >
          <CreditCard className="w-4 h-4" /> Comprar música completa por Pix
        </button>
        
        <div className="flex items-center justify-center gap-1.5 text-brand-label text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" /> Pagamento 100% Seguro
        </div>
      </div>
    </div>
  );
}
