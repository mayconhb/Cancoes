import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppStep, SongFormData, SongPreview, PixData } from '../types';
import StepForm from './StepForm';
import StepGenerating from './StepGenerating';
import StepPreviewPlayer from './StepPreviewPlayer';
import PixCheckout from './PixCheckout';
import SuccessStep from './SuccessStep';

export default function MusicCreationCard() {
  const [step, setStep] = useState<AppStep>('form');
  const [formData, setFormData] = useState<SongFormData>({
    recipient: 'Esposa',
    style: 'Sertanejo Romântico',
    recipientName: '',
    senderName: '',
    story: '',
    emotions: '',
    occasion: 'Aniversário'
  });
  const [preview, setPreview] = useState<SongPreview | null>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);

  const updateFormData = (data: Partial<SongFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleGenerate = async () => {
    console.log("Iniciando geração da música...");
    setStep('generating');
    try {
      const response = await fetch('/api/generate-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha na geração');
      }
      
      const data = await response.json();
      console.log("Música gerada com sucesso:", data);
      setPreview(data);
      setStep('preview');
    } catch (error: any) {
      console.error("Erro ao gerar música:", error.message);
      // In a real app we'd set an error state here
      setStep('form');
    }
  };

  const handleBuy = async () => {
    try {
      const response = await fetch('/api/create-pix', { method: 'POST' });
      if (!response.ok) throw new Error('Erro no checkout');
      const data = await response.json();
      setPixData(data);
      setStep('checkout');
    } catch (error) {
      console.error("Erro ao processar o checkout:", error);
    }
  };

  const titles: Record<AppStep, string> = {
    form: "Detalhes da Homenagem",
    generating: "Sua música está ganhando vida...",
    preview: "Ouça sua prévia",
    checkout: "Finalize o pedido",
    success: "Pronto!"
  };

  const steps: AppStep[] = ['form', 'generating', 'preview', 'checkout', 'success'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
        {/* Decorative glows inside card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/5 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col gap-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between px-2">
            {[1, 2, 3].map((num, i) => {
              const isActive = Math.floor(currentStepIndex / 2) >= i; // Mapping 5 steps to 3 indicators roughly
              const label = i === 0 ? 'Criar' : i === 1 ? 'Gerar' : 'Ouvir';
              
              return (
                <div key={num} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${
                      isActive 
                      ? 'bg-brand-accent text-brand-bg scale-110' 
                      : 'border border-white/20 text-white opacity-30'
                    }`}>
                      {num}
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider transition-all duration-500 ${
                      isActive ? 'text-brand-accent font-bold' : 'text-white opacity-30'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className={`h-[1px] flex-1 mx-4 transition-all duration-500 ${isActive ? 'bg-brand-accent/50' : 'bg-white/10'}`} />}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-serif text-brand-primary">{titles[step]}</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 'form' && (
                <StepForm 
                  data={formData} 
                  updateData={updateFormData} 
                  onNext={handleGenerate} 
                />
              )}
              {step === 'generating' && <StepGenerating />}
              {step === 'preview' && preview && (
                <StepPreviewPlayer 
                  preview={preview} 
                  onBuy={handleBuy} 
                />
              )}
              {step === 'checkout' && pixData && (
                <PixCheckout 
                  pixData={pixData} 
                  onSuccess={() => setStep('success')} 
                />
              )}
              {step === 'success' && <SuccessStep />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
