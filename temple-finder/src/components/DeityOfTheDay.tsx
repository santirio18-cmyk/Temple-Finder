import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodayDeity, type DeityOfDay } from '@/services/deityOfDayService';
import { ChevronRight, Sparkles } from 'lucide-react';
import AffirmationModal from './AffirmationModal';

// Import deity images
import vishnuImg from '@/assets/deities/vishnu.jpg';
import shivaImg from '@/assets/deities/shiva.jpg';
import hanumanImg from '@/assets/deities/hanuman.jpg';
import ganeshaImg from '@/assets/deities/ganpati.jpg';
import lakshmiImg from '@/assets/deities/shakti.jpg';
import muruganImg from '@/assets/deities/murugan.jpg';
import ramImg from '@/assets/deities/ram.jpg';

const deityImages: Record<string, string> = {
  vishnu: vishnuImg,
  shiva: shivaImg,
  hanuman: hanumanImg,
  ganesha: ganeshaImg,
  lakshmi: lakshmiImg, // Using Shakti/Devi image for Lakshmi
  murugan: muruganImg,
  saibaba: ramImg,
};

const DeityOfTheDay = () => {
  const navigate = useNavigate();
  const [deity, setDeity] = useState<DeityOfDay | null>(null);
  const [showAffirmation, setShowAffirmation] = useState(false);

  useEffect(() => {
    const updateDeity = () => {
      const todayDeity = getTodayDeity();
      setDeity(todayDeity);
    };

    updateDeity();

    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      updateDeity();
      const dailyInterval = setInterval(updateDeity, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  if (!deity) return null;

  const deityImage = deityImages[deity.imageKey] || vishnuImg;

  return (
    <section className="px-3 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-saffron" />
            <h2 className="text-lg font-display font-semibold text-foreground">
              Deity of the Day
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground font-body">
            {deity.dayName}'s divine blessing
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div
        onClick={() => setShowAffirmation(true)}
        className="relative overflow-hidden rounded-2xl border shadow-lg cursor-pointer transition-all hover:shadow-xl active:scale-[0.99]"
        style={{
          background: `linear-gradient(135deg, ${deity.color}15 0%, ${deity.color}08 100%)`,
          borderColor: `${deity.color}30`,
        }}
      >
        {/* Deity Image Background */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] opacity-20 overflow-hidden">
          <img
            src={deityImage}
            alt={deity.name}
            className="absolute right-[-10px] top-1/2 -translate-y-1/2 h-[140%] object-cover"
          />
        </div>

        <div className="relative z-10 p-5">
          {/* Deity Name with Icon */}
          <div className="flex items-start gap-4">
            {/* Deity Circle Image */}
            <div
              className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-md flex-shrink-0"
              style={{ borderColor: deity.color }}
            >
              <img
                src={deityImage}
                alt={deity.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                Lord {deity.name}
              </h3>
              <p className="text-sm font-body text-foreground/75 leading-relaxed">
                {deity.description}
              </p>
            </div>
          </div>

          {/* Mantra */}
          <div className="mt-4 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Today's Mantra
            </p>
            <p
              className="text-base font-display font-semibold italic"
              style={{ color: deity.color }}
            >
              {deity.mantra}
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-3">
            <p className="text-xs font-body text-foreground/70 leading-relaxed">
              ✨ {deity.benefits}
            </p>
          </div>

          {/* CTA Buttons - Stacked for Better Visibility */}
          <div className="mt-4 space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAffirmation(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-body text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${deity.color} 0%, ${deity.color}dd 100%)`,
                boxShadow: `0 4px 14px -2px ${deity.color}50`,
              }}
            >
              <Sparkles className="w-4 h-4" />
              Daily Affirmations
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/search?deity=${encodeURIComponent(deity.name)}`);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-body text-sm font-semibold border-2 transition-all hover:bg-background/50 active:scale-[0.98]"
              style={{
                borderColor: deity.color,
                color: deity.color,
                background: `${deity.color}08`,
              }}
            >
              Find Temples
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Affirmation Modal */}
      <AffirmationModal
        isOpen={showAffirmation}
        onClose={() => setShowAffirmation(false)}
        deity={deity}
        deityImage={deityImage}
      />
    </section>
  );
};

export default DeityOfTheDay;
