import { Play, Pause, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  url: string;
}

export default function AudioPlayer({ url }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-sm">
      <audio ref={audioRef} src={url} />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center bg-brand-accent hover:bg-[#c49f27] text-brand-bg rounded-full transition-all shadow-lg shadow-brand-accent/20"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-brand-label uppercase tracking-widest font-bold">
            <span>Tocando Prévia</span>
            <Volume2 className="w-3 h-3" />
          </div>
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
