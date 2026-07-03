import { X, Sparkles, Heart } from 'lucide-react';
import { type DeityOfDay } from '@/services/deityOfDayService';

interface AffirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deity: DeityOfDay;
  deityImage: string;
}

// Affirmations for each deity
const deityAffirmations: Record<string, string[]> = {
  Surya: [
    "I am filled with divine light and energy",
    "My inner radiance shines brightly today",
    "I embrace vitality, health, and confidence",
    "Like the Sun, I illuminate everything around me"
  ],
  Shiva: [
    "I release all that no longer serves me",
    "Peace flows through every cell of my being",
    "I am divinely protected and guided",
    "Transformation brings me closer to my true self"
  ],
  Murugan: [
    "I face challenges with courage and grace",
    "Victory is my birthright",
    "Divine wisdom guides my path",
    "I remove all obstacles from my journey"
  ],
  Ganesha: [
    "New beginnings bring infinite possibilities",
    "Wisdom illuminates my every decision",
    "All obstacles dissolve before me",
    "Success flows naturally into my life"
  ],
  'Sai Baba': [
    "Divine love surrounds me always",
    "Faith and patience guide my journey",
    "I trust in the divine timing of my life",
    "Compassion flows from my heart to all beings"
  ],
  Lakshmi: [
    "Abundance flows to me effortlessly",
    "I am worthy of infinite prosperity",
    "Wealth and fortune are my natural state",
    "I attract blessings in all forms"
  ],
  Vishnu: [
    "Divine protection surrounds me always",
    "I am preserved in love and light",
    "Balance and harmony fill my life",
    "Prosperity and well-being are mine"
  ]
};

const AffirmationModal = ({ isOpen, onClose, deity, deityImage }: AffirmationModalProps) => {
  if (!isOpen) return null;

  const affirmations = deityAffirmations[deity.name] || [
    "I am blessed and divinely guided",
    "Peace and prosperity flow to me",
    "I am surrounded by divine grace"
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${deity.color}08 0%, hsl(var(--background)) 50%)`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-foreground/70" />
        </button>

        {/* Header with Deity Image */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-3 shadow-lg"
              style={{ borderColor: deity.color }}
            >
              <img
                src={deityImage}
                alt={deity.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: deity.color }} />
                <h2 className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">
                  Daily Affirmations
                </h2>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Lord {deity.name}
              </h3>
              <p className="text-xs font-body text-muted-foreground mt-1">
                {deity.dayName}'s Blessings
              </p>
            </div>
          </div>
        </div>

        {/* Affirmations List */}
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {affirmations.map((affirmation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm"
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${deity.color}20` }}
                >
                  <Heart 
                    className="w-3.5 h-3.5" 
                    style={{ color: deity.color }}
                    fill={deity.color}
                  />
                </div>
                <p className="flex-1 text-sm font-body text-foreground/85 leading-relaxed">
                  {affirmation}
                </p>
              </div>
            ))}
          </div>

          {/* Mantra Box */}
          <div 
            className="mt-6 p-4 rounded-xl border-2"
            style={{ 
              borderColor: `${deity.color}40`,
              background: `linear-gradient(135deg, ${deity.color}10 0%, ${deity.color}05 100%)`
            }}
          >
            <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 text-center">
              Chant Today
            </p>
            <p 
              className="text-lg font-display font-bold text-center italic"
              style={{ color: deity.color }}
            >
              {deity.mantra}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${deity.color} 0%, ${deity.color}dd 100%)`,
              boxShadow: `0 4px 12px -2px ${deity.color}40`,
            }}
          >
            Close & Reflect
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffirmationModal;
