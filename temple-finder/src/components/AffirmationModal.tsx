import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';
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

  if (!isOpen) return null;

  const affirmations = deityAffirmations[deity.name] || [
    "I am blessed and divinely guided",
    "Peace and prosperity flow to me",
    "I am surrounded by divine grace"
  ];

  // Show 5 cards max, or all if less than 5
  const numberOfCards = Math.min(affirmations.length, 5);
  const cardsToShow = Array.from({ length: numberOfCards }, (_, i) => i);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null) return; // Already selected
    setSelectedCard(cardIndex);
  };

  const handleReset = () => {
    setSelectedCard(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          maxHeight: '92vh',
          border: `3px solid ${deity.color}`,
          boxShadow: `0 30px 80px -15px ${deity.color}60, 0 15px 40px -10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Close Button - More Visible */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
          aria-label="Close"
          style={{ 
            background: `linear-gradient(135deg, ${deity.color} 0%, ${deity.color}dd 100%)`,
            boxShadow: `0 4px 16px ${deity.color}60`,
          }}
        >
          <X className="w-6 h-6 text-white" strokeWidth={3} />
        </button>

        {/* Header with Deity Image */}
        <div className="relative p-5 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-20 h-20 rounded-full overflow-hidden shadow-2xl"
              style={{ 
                border: `3px solid ${deity.color}`,
                boxShadow: `0 6px 20px ${deity.color}40`,
              }}
            >
              <img
                src={deityImage}
                alt={deity.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: deity.color }} />
                <h2 className="text-[10px] font-body font-bold uppercase tracking-wider" style={{ color: deity.color }}>
                  Daily Affirmations
                </h2>
              </div>
              <h3 className="font-display text-2xl font-bold leading-tight" style={{ color: deity.color }}>
                Lord {deity.name}
              </h3>
              <p className="text-xs font-body font-medium text-foreground/70 mt-0.5">
                {deity.dayName}'s Blessings ✨
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Card Selection */}
        <div className="px-4 pb-4">
          {selectedCard === null ? (
            /* Step 1: Show multiple face-down cards to pick */
            <div className="space-y-3">
              <div className="text-center px-4">
                <p className="text-lg font-display font-bold mb-1" style={{ color: deity.color }}>
                  🙏 Pick Your Blessing Card
                </p>
                <p className="text-xs font-body font-medium text-foreground/60">
                  Trust your intuition and choose a card
                </p>
              </div>

              {/* Card Spread - Fan Layout */}
              <div className="relative h-56 flex items-center justify-center">
                {cardsToShow.map((cardIndex, arrayIndex) => {
                  const totalCards = cardsToShow.length;
                  const middleIndex = (totalCards - 1) / 2;
                  const offset = arrayIndex - middleIndex;
                  
                  // Calculate rotation and position
                  const rotation = offset * 8; // degrees
                  const translateX = offset * 35; // px
                  const translateY = Math.abs(offset) * 15; // px (higher for cards on sides)
                  
                  return (
                    <button
                      key={cardIndex}
                      type="button"
                      onClick={() => handleCardClick(cardIndex)}
                      className="absolute w-28 transition-all duration-300 hover:scale-110 hover:-translate-y-4 cursor-pointer group"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        zIndex: arrayIndex === Math.floor(middleIndex) ? 10 : 5,
                      }}
                    >
                      {/* Card Back - Face Down */}
                      <div
                        className="relative overflow-hidden rounded-2xl"
                        style={{
                          aspectRatio: '2/3',
                          background: `linear-gradient(135deg, ${deity.color} 0%, ${deity.color}cc 100%)`,
                          boxShadow: `0 25px 50px -12px ${deity.color}60, 0 12px 24px -8px rgba(0,0,0,0.4)`,
                          border: `2px solid ${deity.color}`,
                        }}
                      >
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-25">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-20 h-20 text-white drop-shadow-lg" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <Sparkles className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Sparkles className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute top-1/3 right-6">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div className="absolute bottom-1/3 left-6">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Card Number (hidden initially) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full border-3 border-white/60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <span className="text-3xl font-display font-bold text-white">
                              ?
                            </span>
                          </div>
                        </div>

                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 60%)',
                          }}
                        />
                        
                        {/* Shine effect */}
                        <div 
                          className="absolute inset-0 opacity-40"
                          style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)',
                          }}
                        />
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
            /* Step 2: Show revealed card with affirmation */
            <div 
              className="space-y-2 animate-fade-in-up"
              style={{
                animation: 'fadeInUp 0.6s ease-out',
              }}
            >
              {/* Revealed Card */}
              <div className="relative max-w-[280px] mx-auto">
                <div
                  className="relative overflow-hidden rounded-2xl transform"
                  style={{
                    aspectRatio: '3/4',
                    maxHeight: '300px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)',
                    animation: 'cardFlip 0.8s ease-out',
                  }}
                >
                  {/* Deity Image - Full Background */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundImage: `url(${deityImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  {/* Dark Overlay for Text Readability */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)',
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-4">
                    {/* Top - Deity Name */}
                    <div className="text-center">
                      <p 
                        className="font-display text-base font-bold text-white tracking-wide animate-fade-in" 
                        style={{ 
                          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                          fontStyle: 'italic',
                          animationDelay: '0.3s',
                          animationFillMode: 'both',
                        }}
                      >
                        {deity.name}
                      </p>
                    </div>
                    
                    {/* Center - Affirmation Quote */}
                    <div className="flex-1 flex items-center justify-center px-1">
                      <p 
                        className="font-display text-sm font-semibold text-white leading-snug text-center animate-fade-in" 
                        style={{ 
                          textShadow: '0 3px 10px rgba(0,0,0,0.6)',
                          letterSpacing: '0.02em',
                          animationDelay: '0.5s',
                          animationFillMode: 'both',
                        }}
                      >
                        {affirmations[selectedCard]}
                      </p>
                    </div>
                    
                    {/* Bottom - Sparkle decoration */}
                    <div className="flex justify-center">
                      <Sparkles className="w-6 h-6 text-white opacity-80 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pick Another Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2 rounded-full font-body text-xs font-semibold border-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: deity.color,
                  color: deity.color,
                  background: `${deity.color}10`,
                }}
              >
                🔄 Pick Another Card
              </button>
            </div>
          )}

          {/* Mantra Box */}
          <div 
            className="mt-2 p-2.5 rounded-xl border-2"
            style={{ 
              borderColor: `${deity.color}40`,
              background: `linear-gradient(135deg, ${deity.color}10 0%, ${deity.color}05 100%)`
            }}
          >
            <p className="text-[8px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1 text-center">
              Chant Today
            </p>
            <p 
              className="text-sm font-display font-bold text-center italic leading-tight"
              style={{ color: deity.color }}
            >
              {deity.mantra}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
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
