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

  const numberOfCards = Math.min(affirmations.length, 4);
  const cardsToShow = Array.from({ length: numberOfCards }, (_, i) => i);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null) return;
    setSelectedCard(cardIndex);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-card-warm border border-[hsl(var(--temple-gold)/0.35)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, hsl(30,40%,98%) 0%, hsl(28,50%,94%) 55%, hsl(25,45%,92%) 100%)',
          maxHeight: '92vh',
        }}
      >
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 border border-[hsl(var(--temple-gold)/0.35)] shadow-sm flex items-center justify-center hover:bg-[hsl(var(--saffron)/0.08)] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-saffron" strokeWidth={2.5} />
        </button>

        <div className="relative px-5 pt-6 pb-3 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 ring-2 ring-[hsl(var(--saffron)/0.45)] shadow-temple bg-[hsl(30,40%,96%)]">
            <img
              src={deityImage}
              alt={deity.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              <h2 className="text-[10px] font-body font-bold uppercase tracking-[0.14em] text-saffron">
                Daily Affirmations
              </h2>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground leading-tight">
              Lord {deity.name}
            </h3>
            <p className="text-xs font-body text-muted-foreground mt-0.5">
              {deity.dayName}&apos;s Blessings
            </p>
          </div>
        </div>

        <div className="px-4 pb-4 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 160px)' }}>
          {selectedCard === null ? (
            <div className="space-y-3">
              <div className="text-center px-2">
                <p className="text-base font-display font-bold text-foreground mb-0.5">
                  Pick your blessing card
                </p>
                <p className="text-xs font-body text-muted-foreground">
                  Trust your intuition and choose one
                </p>
              </div>

              <div className="relative h-52 flex items-center justify-center">
                {cardsToShow.map((cardIndex, arrayIndex) => {
                  const totalCards = cardsToShow.length;
                  const middleIndex = (totalCards - 1) / 2;
                  const offset = arrayIndex - middleIndex;
                  const rotation = offset * 7;
                  const translateX = offset * 42;
                  const translateY = Math.abs(offset) * 10;

                  return (
                    <button
                      key={cardIndex}
                      type="button"
                      onClick={() => handleCardClick(cardIndex)}
                      className="absolute w-[5.75rem] transition-transform duration-300 hover:-translate-y-3 hover:scale-105 active:scale-95 cursor-pointer"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        zIndex: 5 + arrayIndex,
                      }}
                      aria-label={`Blessing card ${cardIndex + 1}`}
                    >
                      <div
                        className="relative overflow-hidden rounded-xl border-2 border-[hsl(var(--temple-gold)/0.55)] shadow-card-warm"
                        style={{
                          aspectRatio: '2/3',
                          background:
                            'linear-gradient(145deg, hsl(var(--saffron)) 0%, hsl(28, 70%, 42%) 45%, hsl(var(--temple-gold)) 100%)',
                        }}
                      >
                        <div
                          className="absolute inset-[6px] rounded-lg border border-white/25"
                          style={{
                            background:
                              'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)',
                          }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl text-white/95 font-display leading-none drop-shadow-sm">
                            ॐ
                          </span>
                          <span className="w-8 h-[2px] rounded-full bg-white/50" />
                          <span className="text-[10px] font-body font-semibold tracking-[0.2em] text-white/90 uppercase">
                            Blessing
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-center text-[11px] font-body text-muted-foreground italic">
                Each card holds a divine message
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full space-y-3">
              <div
                className="relative w-[min(100%,240px)] overflow-hidden rounded-xl border border-[hsl(var(--temple-gold)/0.4)] shadow-card-warm"
                style={{ aspectRatio: '4/5', maxHeight: '250px' }}
              >
                <img
                  src={deityImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/65" />
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  <p className="text-center font-display text-sm font-bold text-white/95">
                    {deity.name}
                  </p>
                  <p className="font-display text-sm font-semibold text-white leading-snug text-center px-1">
                    {affirmations[selectedCard]}
                  </p>
                  <div className="flex justify-center">
                    <Sparkles className="w-4 h-4 text-[hsl(var(--temple-gold))]" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="w-[min(100%,240px)] py-2 rounded-full font-body text-xs font-semibold border border-[hsl(var(--temple-gold)/0.45)] text-saffron bg-white/70 hover:bg-[hsl(var(--saffron)/0.08)] transition-colors"
              >
                Pick another card
              </button>
            </div>
          )}

          <div className="mt-3 rounded-xl border border-[hsl(var(--temple-gold)/0.3)] bg-white/55 px-3 py-2.5">
            <p className="text-[9px] font-body font-semibold uppercase tracking-wider text-muted-foreground text-center mb-0.5">
              Chant today
            </p>
            <p className="text-sm font-display font-bold text-center text-saffron italic leading-tight">
              {deity.mantra}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-3 py-2.5 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--saffron-light)) 100%)',
              boxShadow: '0 4px 14px -3px hsl(var(--saffron) / 0.4)',
            }}
          >
            Close & reflect
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AffirmationModal;
