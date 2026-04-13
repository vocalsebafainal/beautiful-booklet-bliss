import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

const AudioPlayer = ({ src, title }: AudioPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
      <Button
        size="icon"
        variant="ghost"
        onClick={toggle}
        className="h-9 w-9 shrink-0 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </Button>
      {title && <span className="text-sm text-muted-foreground truncate">{title}</span>}
      <Volume2 className="h-4 w-4 text-muted-foreground/50 ml-auto shrink-0" />
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />
    </div>
  );
};

export default AudioPlayer;
