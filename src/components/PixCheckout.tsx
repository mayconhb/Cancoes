import { useState, useEffect } from 'react';
import { PixData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

interface PixCheckoutProps {
  pixData: PixData;
  onSuccess: () => void;
}

export default function PixCheckout({ pixData, onSuccess }: PixCheckoutProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'pending' | 'approved'>('pending');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixData.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let interval: any;
    
    if (status === 'pending') {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/check-payment/${pixData.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data.status === 'approved') {
              setStatus('approved');
              onSuccess();
            }
          }
        } catch (error) {
          console.error("Check status error", error);
        }
      }, 5000);
    }

    // Mock auto-approve for demonstration if in mock mode
    if (pixData.id.startsWith('mock-')) {
      const mockTimer = setTimeout(() => {
        setStatus('approved');
        onSuccess();
      }, 15000); // 15s to simulate
      return () => {
        clearInterval(interval);
        clearTimeout(mockTimer);
      };
    }

    return () => clearInterval(interval);
  }, [pixData.id, status, onSuccess]);

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-serif text-brand-primary">Finalize seu presente</h3>
        <p className="text-[10px] text-brand-label uppercase tracking-widest font-bold">Escaneie o código Pix abaixo</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-black/50 ring-1 ring-white/20">
          <QRCodeSVG value={pixData.qrCode} size={180} />
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <label className="text-[10px] text-brand-label uppercase tracking-widest font-bold ml-1">Código Pix Copia e Cola</label>
          <div className="relative">
            <input
              readOnly
              value={pixData.qrCode}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-brand-muted pr-12 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-all text-brand-accent"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest">
            <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
            Aguardando...
          </div>
          <span className="text-lg font-serif font-bold text-brand-accent">R$ {pixData.amount.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-brand-accent animate-pulse w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center">
        <p className="text-[10px] text-brand-label font-bold uppercase tracking-widest flex items-center justify-center gap-1">
          <RefreshCw className="w-3 h-3" /> Verificação automática ativa
        </p>
      </div>
    </div>
  );
}
