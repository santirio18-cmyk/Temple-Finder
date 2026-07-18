import { X, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setSelectedCard(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const affirmations = deityAffirmations[deity.name] || [
    "I am blessed and divinely guided",
    "Peace and prosperity flow to me",
    "I am surrounded by divine grace"
  ];

  const numberOfCards = Math.min(affirmations.length, 5);
  const cardsToShow = Array.from({ length: numberOfCards }, (_, i) => i);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null) return;
    setSelectedCard(cardIndex);
  };

  const handleReset = () => {
    setSelectedCard(null);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[hsl(var(--temple-gold)/0.35)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(165deg, hsl(30, 40%, 98%) 0%, hsl(28, 45%, 94%) 100%)',
          maxHeight: '92vh',
          boxShadow: '0 24px 60px -16px hsl(28 50% 30% / 0.35)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-all active:scale-95 bg-[hsl(30,40%,97%)] border border-[hsl(var(--temple-gold)/0.4)]"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-saffron" strokeWidth={2.5} />
        </button>

        <div className="relative px-6 pt-6 pb-3 flex flex-col items-center">
          {/* Soft portrait — object-contain so stock crops don’t look clipped/neon */}
          <div
            className="w-28 h-28 rounded-full overflow-hidden mb-3 mx-auto flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, hsl(35, 50%, 92%) 0%, hsl(28, 40%, 88%) 100%)',
              border: '2px solid hsl(var(--temple-gold) / 0.45)',
              boxShadow: '0 8px 24px hsl(28 40% 40% / 0.18)',
            }}
          >
            <img
              src={deityImage}
              alt={deity.name}
              className="w-[92%] h-[92%] object-contain object-bottom"
            />
          </div>

          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-saffron" />
              <h2 className="text-[11px] font-body font-bold uppercase tracking-wider text-saffron">
                Daily Affirmations
              </h2>
            </div>
            <h3 className="font-display text-2xl font-bold leading-tight mb-1 text-foreground">
              Lord {deity.name}
            </h3>
            <p className="text-sm font-body font-medium text-muted-foreground">
              {deity.dayName}&apos;s blessings
            </p>
          </div>
        </div>

        <div className="px-4 pb-4 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 140px)' }}>
          {selectedCard === null ? (
            <div className="space-y-3">
              <div className="text-center px-4">
                <p className="text-lg font-display font-bold mb-1 text-foreground">
                  Pick your blessing card
                </p>
                <p className="text-xs font-body font-medium text-muted-foreground">
                  Trust your intuition and choose a card
                </p>
              </div>

              <div className="relative h-56 flex items-center justify-center">
                {cardsToShow.map((cardIndex, arrayIndex) => {
                  const totalCards = cardsToShow.length;
                  const middleIndex = (totalCards - 1) / 2;
                  const offset = arrayIndex - middleIndex;
                  const rotation = offset * 8;
                  const translateX = offset * 35;
                  const translateY = Math.abs(offset) * 15;

                  return (
                    <button
                      key={cardIndex}
                      type="button"
                      onClick={() => handleCardClick(cardIndex)}
                      className="absolute w-28 transition-all duration-300 hover:scale-105 hover:-translate-y-3 cursor-pointer group"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        zIndex: arrayIndex === Math.floor(middleIndex) ? 10 : 5,
                      }}
                    >
                      <div
                        className="relative overflow-hidden rounded-2xl border border-[hsl(var(--temple-gold)/0.45)]"
                        style={{
                          aspectRatio: '2/3',
                          background: 'linear-gradient(160deg, hsl(35, 45%, 96%) 0%, hsl(28, 50%, 88%) 55%, hsl(25, 55%, 78%) 100%)',
                          boxShadow: '0 12px 28px hsl(28 40% 30% / 0.2)',
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border border-[hsl(var(--temple-gold)/0.5)] flex items-center justify-center bg-white/50">
                            <span className="text-2xl font-display font-bold text-saffron">?</span>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Sparkles className="w-4 h-4 text-saffron/50" />
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Sparkles className="w-4 h-4 text-saffron/50" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <p className="text-xs font-body font-medium text-foreground/60 italic">
                  ✨ Each card holds a divine message
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full space-y-2">
              <div className="w-full flex justify-center">
                <div
                  className="relative w-[min(100%,260px)] overflow-hidden rounded-2xl border border-[hsl(var(--temple-gold)/0.4)]"
                  style={{
                    aspectRatio: '4/5',
                    maxHeight: '240px',
                    background: 'linear-gradient(165deg, hsl(35, 45%, 96%) 0%, hsl(28, 40%, 90%) 100%)',
                    boxShadow: '0 12px 28px hsl(28 40% 30% / 0.2)',
                    animation: 'cardFlip 0.8s ease-out',
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-[42%] flex items-end justify-center pt-3 opacity-90">
                    <img
                      src={deityImage}
                      alt=""
                      className="h-full w-auto max-w-[70%] object-contain object-bottom"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-end h-full p-4 pt-[45%]">
                    <p className="font-display text-sm font-bold text-saffron text-center mb-2">
                      {deity.name}
                    </p>
                    <p className="font-display text-sm font-semibold text-foreground leading-snug text-center">
                      {affirmations[selectedCard]}
                    </p>
                    <div className="flex justify-center mt-3">
                      <Sparkles className="w-4 h-4 text-saffron/70" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-[min(100%,260px)] py-1.5 rounded-full font-body text-xs font-semibold border border-[hsl(var(--temple-gold)/0.45)] text-saffron bg-[hsl(var(--saffron)/0.06)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Pick another card
              </button>
            </div>
          )}

          <div className="mt-2 p-2.5 rounded-xl border border-[hsl(var(--temple-gold)/0.3)] bg-white/50">
            <p className="text-[8px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 text-center">
              Chant today
            </p>
            <p className="text-xs font-display font-bold text-center italic leading-tight text-saffron">
              {deity.mantra}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--saffron-light)) 100%)',
              boxShadow: '0 4px 14px -3px hsl(var(--saffron) / 0.4)',
            }}
          >
            Close & Reflect
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AffirmationModal;
