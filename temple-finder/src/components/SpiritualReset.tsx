import { useState } from "react";
import { Pause, Wind, Eye, Music } from "lucide-react";

const resets = [
  {
    id: "breathe",
    title: "Pranayama",
    subtitle: "4-7-8 Breathing",
    icon: Wind,
    duration: "1 min",
    instruction: "Inhale 4s… Hold 7s… Exhale 8s…",
  },
  {
    id: "mantra",
    title: "Om Chanting",
    subtitle: "Sacred Vibration",
    icon: Music,
    duration: "1 min",
    instruction: "Close your eyes. Let \"ॐ\" resonate.",
  },
  {
    id: "tratak",
    title: "Diya Tratak",
    subtitle: "Candle Gazing",
    icon: Eye,
    duration: "1 min",
    instruction: "Gaze softly. Let thoughts dissolve.",
  },
];

const SpiritualReset = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="px-3 py-5 bg-warm-cream relative overflow-hidden">
      {/* Mandala watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none select-none opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-foreground">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="100" cy="50" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${a} 100 100)`} />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            1-Min Spiritual Reset
          </h2>
          <p className="text-[11px] text-muted-foreground font-body mt-0.5">
            Pause. Breathe. Reconnect.
          </p>
        </div>
        {/* Breathing Om indicator */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border border-saffron/20 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron/25 to-accent/15 flex items-center justify-center">
              <span className="text-sm font-display text-saffron animate-gentle-float">ॐ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scrollable reset cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {resets.map((r, i) => {
          const Icon = r.icon;
          const isActive = activeId === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setActiveId(isActive ? null : r.id)}
              className={`relative min-w-[150px] max-w-[150px] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300 animate-fade-in-up ${
                isActive ? "ring-1 ring-saffron/40 shadow-temple" : "shadow-card-warm"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative bg-card p-4 flex flex-col items-center text-center gap-2.5">
                {/* Icon circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-saffron text-primary-foreground scale-110 shadow-temple"
                    : "bg-saffron/10 text-saffron"
                }`}>
                  {isActive ? <Pause className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>

                {/* Title */}
                <div>
                  <p className="text-xs font-display font-semibold text-foreground">{r.title}</p>
                  <p className="text-[10px] font-body text-muted-foreground mt-0.5">{r.subtitle}</p>
                </div>

                {/* Duration badge */}
                <span className="text-[9px] font-body font-semibold px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron">
                  {r.duration}
                </span>

                {/* Instruction when active */}
                {isActive && (
                  <div className="animate-fade-in-up">
                    <p className="text-[9px] font-body text-muted-foreground italic leading-relaxed">
                      {r.instruction}
                    </p>
                    <div className="mt-2 h-0.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-saffron to-accent animate-[shimmer_2s_linear_infinite]" style={{ width: "40%" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SpiritualReset;
