import { motion } from 'motion/react';
import { CheckCircle2, Download, Share2, Heart } from 'lucide-react';

export default function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center shadow-2xl shadow-brand-accent/40"
      >
        <CheckCircle2 className="w-12 h-12 text-brand-bg" />
      </motion.div>

      <div className="space-y-3">
        <h3 className="text-2xl font-serif text-brand-primary">Pagamento Aprovado!</h3>
        <p className="text-sm text-brand-muted max-w-xs mx-auto leading-relaxed">
          Sua música completa e personalizada já foi liberada e está pronta para emocionar quem você ama.
        </p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button className="w-full bg-brand-accent text-brand-bg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#c49f27] transition-all active:scale-[0.98] uppercase tracking-widest text-xs">
          <Download className="w-5 h-5" /> Baixar Música Completa
        </button>
        <button className="w-full bg-white/5 border border-white/10 text-brand-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-[0.98] uppercase tracking-widest text-xs">
          <Share2 className="w-5 h-5" /> Compartilhar
        </button>
      </div>

      <div className="pt-4 flex flex-col items-center gap-2">
        <Heart className="w-6 h-6 text-brand-accent fill-current animate-pulse" />
        <p className="text-[10px] text-brand-label uppercase tracking-[0.2em] font-bold">Inesquecível</p>
      </div>
    </div>
  );
}
