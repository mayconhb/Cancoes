import React from 'react';
import { SongFormData } from '../types';
import { Music, Heart, Sparkles, User, MessageCircle } from 'lucide-react';

interface StepFormProps {
  data: SongFormData;
  updateData: (data: Partial<SongFormData>) => void;
  onNext: () => void;
}

export default function StepForm({ data, updateData, onNext }: StepFormProps) {
  const styles = [
    'Sertanejo Romântico', 'Pop', 'Gospel', 'Pagode', 
    'Funk Melody', 'Trap Romântico', 'Acústico', 'MPB', 'Outro'
  ];

  const recipients = [
    'Esposa', 'Marido', 'Namorado(a)', 'Filho(a)', 
    'Mãe', 'Pai', 'Amigo(a)', 'Outro'
  ];

  const occasions = [
    'Aniversário', 'Casamento', 'Pedido de Desculpas', 
    'Declaração de Amor', 'Dia das Mães', 'Dia dos Pais', 
    'Nascimento', 'Surpresa', 'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário submetido. Dados:", data);
    if (data.recipientName && data.senderName && data.story) {
      console.log("Campos validados, chamando onNext()...");
      onNext();
    } else {
      console.warn("Validação falhou: campos obrigatórios vazios.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-brand-label font-bold flex items-center gap-1 ml-1">
            <User className="w-3 h-3" /> Para quem?
          </label>
          <select
            value={data.recipient}
            onChange={e => updateData({ recipient: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            {recipients.map(r => <option key={r} value={r} className="bg-[#1a0b16]">{r}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-brand-label font-bold flex items-center gap-1 ml-1">
            <Music className="w-3 h-3" /> Estilo
          </label>
          <select
            value={data.style}
            onChange={e => updateData({ style: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            {styles.map(s => <option key={s} value={s} className="bg-[#1a0b16]">{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest text-brand-label font-bold ml-1">Nomes (Vocês dois)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            required
            type="text"
            value={data.recipientName}
            onChange={e => updateData({ recipientName: e.target.value })}
            placeholder="Quem recebe"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-brand-accent focus:outline-none transition-colors"
          />
          <input
            required
            type="text"
            value={data.senderName}
            onChange={e => updateData({ senderName: e.target.value })}
            placeholder="Seu nome"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest text-brand-label font-bold ml-1 flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> A história de vocês
        </label>
        <textarea
          required
          value={data.story}
          onChange={e => updateData({ story: e.target.value })}
          placeholder="Conte um momento especial ou como se conheceram..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-brand-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-brand-accent hover:bg-[#c49f27] text-brand-bg font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 group uppercase tracking-widest text-xs"
        >
          Criar minha música agora
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <p className="text-center text-[10px] text-brand-label pt-2">
        Ao clicar, nossa IA começará a compor sua prévia exclusiva.
      </p>
    </form>
  );
}
