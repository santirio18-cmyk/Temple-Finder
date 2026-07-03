import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentCard, setCurrentCard] = useState(0);

  if (!isOpen) return null;

  const affirmations = deityAffirmations[deity.name] || [
    "I am blessed and divinely guided",
    "Peace and prosperity flow to me",
    "I am surrounded by divine grace"
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % affirmations.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + affirmations.length) % affirmations.length);
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

        {/* Physical Blessing Card */}
        <div className="px-4 pb-6">
          {/* Card Container - Like Physical Card */}
          <div className="relative max-w-xs mx-auto">
            {/* Main Physical Card */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: '2/3',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)',
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
                    className="font-display text-lg font-bold text-white tracking-wide" 
                    style={{ 
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      fontStyle: 'italic',
                    }}
                  >
                    {deity.name}
                  </p>
                </div>
                
                {/* Center - Affirmation Quote */}
                <div className="flex-1 flex items-center justify-center px-2">
                  <p 
                    className="font-display text-base font-semibold text-white leading-relaxed text-center" 
                    style={{ 
                      textShadow: '0 3px 10px rgba(0,0,0,0.6)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {affirmations[currentCard]}
                  </p>
                </div>
                
                {/* Bottom - Attribution/Dots */}
                <div className="flex justify-center items-center gap-2">
                  {affirmations.map((_, index) => (
                    <div 
                      key={index}
                      className="rounded-full transition-all"
                      style={{
                        width: index === currentCard ? '20px' : '6px',
                        height: '6px',
                        backgroundColor: 'white',
                        opacity: index === currentCard ? 1 : 0.5,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows - Outside Card */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevCard();
              }}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-10"
              style={{ border: `3px solid ${deity.color}` }}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: deity.color }} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextCard();
              }}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-10"
              style={{ border: `3px solid ${deity.color}` }}
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" style={{ color: deity.color }} strokeWidth={3} />
            </button>
          </div>

          {/* Card Counter */}
          <div className="text-center mt-6">
            <p className="text-sm font-body font-semibold" style={{ color: deity.color }}>
              Card {currentCard + 1} of {affirmations.length}
            </p>
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
