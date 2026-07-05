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
  const [isRevealing, setIsRevealing] = useState(false);

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
    
    setIsRevealing(true);
    setTimeout(() => {
      setSelectedCard(cardIndex);
    }, 300);
  };

  const handleReset = () => {
    setSelectedCard(null);
    setIsRevealing(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${deity.color}08 0%, hsl(var(--background)) 50%)`,
          maxHeight: '85vh',
        }}
      >
        {/* Close Button - More Visible */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
          aria-label="Close"
          style={{ border: `2px solid ${deity.color}` }}
        >
          <X className="w-6 h-6" style={{ color: deity.color }} strokeWidth={2.5} />
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

        {/* Interactive Card Selection */}
        <div className="px-4 pb-6">
          {selectedCard === null ? (
            /* Step 1: Show multiple face-down cards to pick */
            <div className="space-y-6">
              <div className="text-center px-4">
                <p className="text-lg font-display font-semibold text-foreground mb-2">
                  🙏 Pick Your Blessing Card
                </p>
                <p className="text-sm font-body text-muted-foreground">
                  Trust your intuition and choose a card
                </p>
              </div>

              {/* Card Spread - Fan Layout */}
              <div className="relative h-72 flex items-center justify-center">
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
                      className="absolute w-32 transition-all duration-300 hover:scale-110 hover:-translate-y-4 cursor-pointer group"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        zIndex: arrayIndex === Math.floor(middleIndex) ? 10 : 5,
                      }}
                    >
                      {/* Card Back - Face Down */}
                      <div
                        className="relative overflow-hidden rounded-xl shadow-2xl"
                        style={{
                          aspectRatio: '2/3',
                          background: `linear-gradient(135deg, ${deity.color} 0%, ${deity.color}dd 100%)`,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)',
                        }}
                      >
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-16 h-16 text-white" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Card Number (hidden initially) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center">
                            <span className="text-2xl font-display font-bold text-white opacity-50">
                              ?
                            </span>
                          </div>
                        </div>

                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                          style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <p className="text-xs font-body text-muted-foreground italic">
                  ✨ Each card holds a divine message for you
                </p>
              </div>
            </div>
          ) : (
            /* Step 2: Show revealed card with affirmation */
            <div 
              className="space-y-6 animate-fade-in-up"
              style={{
                animation: 'fadeInUp 0.6s ease-out',
              }}
            >
              {/* Revealed Card */}
              <div className="relative max-w-xs mx-auto">
                <div
                  className="relative overflow-hidden rounded-2xl transform"
                  style={{
                    aspectRatio: '2/3',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 12px 24px rgba(0,0,0,0.3)',
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
                  <div className="relative z-10 flex flex-col justify-between h-full p-6">
                    {/* Top - Deity Name */}
                    <div className="text-center">
                      <p 
                        className="font-display text-lg font-bold text-white tracking-wide animate-fade-in" 
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
                    <div className="flex-1 flex items-center justify-center px-2">
                      <p 
                        className="font-display text-base font-semibold text-white leading-relaxed text-center animate-fade-in" 
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
                      <Sparkles className="w-8 h-8 text-white opacity-80 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div 
                className="text-center px-4 animate-fade-in"
                style={{
                  animationDelay: '0.7s',
                  animationFillMode: 'both',
                }}
              >
                <p className="text-sm font-body font-semibold mb-1" style={{ color: deity.color }}>
                  🎊 Your Blessing Has Been Revealed!
                </p>
                <p className="text-xs text-muted-foreground">
                  Carry this message in your heart today
                </p>
              </div>

              {/* Pick Another Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-full font-body text-sm font-medium border-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: deity.color,
                  color: deity.color,
                  background: `${deity.color}10`,
                }}
              >
                Pick Another Card
              </button>
            </div>
          )}

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
