import { motion } from 'motion/react';
import { Sparkles, Heart, Music, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const benefits = [
    { text: "Baseado em fatos reais da sua vida" },
    { text: "Ouça uma prévia gratuita antes de comprar" },
    { text: "Pagamento instantâneo via Pix" },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-2"
        >
          <span className="text-brand-secondary uppercase tracking-[0.3em] text-xs font-bold">Melodia IA</span>
          <div className="h-[1px] w-12 bg-brand-accent"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif leading-[1.1] text-brand-primary"
        >
          Transforme sua <br/>
          <span className="italic text-brand-secondary">história</span> em uma música.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-brand-muted leading-relaxed max-w-xl"
        >
          Crie uma canção única para emocionar quem você ama. <br/>
          Conte os detalhes, escolha o ritmo e sinta a magia da IA.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
            </div>
            <span className="text-sm text-brand-secondary font-medium">{b.text}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-6"
      >
        <div className="flex -space-x-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className={`w-10 h-10 rounded-full border-2 border-brand-bg bg-brand-label/40 backdrop-blur-sm`} />
          ))}
        </div>
        <p className="text-xs text-brand-label font-medium">
          +1.500 histórias transformadas em canções este mês
        </p>
      </motion.div>
    </div>
  );
}
