import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function StepGenerating() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Transformando sua história em música...",
    "Criando letra personalizada...",
    "Gerando melodia exclusiva...",
    "Ajustando os arranjos...",
    "Preparando sua prévia premium...",
    "Quase pronto para te emocionar..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 100);

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-8">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border-4 border-dashed border-brand-accent/30 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center"
        >
          <div className="flex gap-1 items-end h-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 24, 12, 32, 16, 8] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut" 
                }}
                className="w-1.5 bg-brand-accent rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4 text-center">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-serif italic text-brand-secondary h-14 flex items-center justify-center"
        >
          {messages[messageIndex]}
        </motion.p>

        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-brand-label font-bold uppercase tracking-widest">{progress}% COMPLETO</p>
      </div>
    </div>
  );
}
