import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import vishnuImg from "@/assets/deities/vishnu-sacred.png";
import shivaImg from "@/assets/deities/shiva.jpg";
import muruganImg from "@/assets/deities/murugan.jpg";
import ganeshaImg from "@/assets/deities/ganpati.jpg";
import deviImg from "@/assets/deities/shakti.jpg";
import divineImg from "@/assets/deities/vishnu-watercolor.png";
import { getCurrentTithi, type TithiDeityKey } from "@/services/festivalService";

const tithiDeityImages: Record<TithiDeityKey, string> = {
  vishnu: vishnuImg,
  shiva: shivaImg,
  murugan: muruganImg,
  ganesha: ganeshaImg,
  devi: deviImg,
  divine: divineImg,
};

const SacredToday = () => {
  const navigate = useNavigate();
  const [tithiData, setTithiData] = useState({
    tithi: 'Ekadashi',
    description: 'A sacred day to connect with Lord Vishnu',
    nextEkadashi: 15,
    deityKey: 'vishnu' as TithiDeityKey,
  });

  useEffect(() => {
    // Get current tithi on mount and update daily
    const updateTithi = () => {
      const data = getCurrentTithi();
      setTithiData(data);
    };

    updateTithi();

    // Update at midnight each day
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      updateTithi();
      // Set up daily interval after first midnight update
      const dailyInterval = setInterval(updateTithi, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  return (
    <section
      className="bg-background relative z-10 -mt-5 animate-fade-in-up"
      style={{ borderRadius: '28px 28px 0 0' }}
    >
      <div className="px-3 pt-6">
        {/* Main Sacred Today Card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-saffron-glow/20"
          style={{
            background: "linear-gradient(135deg, hsl(var(--warm-cream)) 0%, hsl(28 60% 92%) 40%, hsl(25 55% 90%) 100%)",
          }}
        >
          {/* Deity illustration - taller */}
          <div className="absolute right-0 top-0 bottom-0 w-[38%] pointer-events-none overflow-hidden">
            <img
              src={tithiDeityImages[tithiData.deityKey]}
              alt=""
              className="absolute right-[-4px] bottom-[-6px] h-[130%] object-contain opacity-90 drop-shadow-sm"
            />
          </div>

          <div className="relative z-10 px-4 py-4">
            {/* Header row */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">🪔</span>
              <span className="text-[10px] font-body font-semibold text-saffron-deep tracking-wider uppercase">
                Sacred Today
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl font-bold text-foreground leading-snug">
              {tithiData.tithi}
            </h3>

            {/* Description */}
            <p className="text-sm font-body text-foreground/75 mt-1.5 max-w-[58%] leading-relaxed">
              {tithiData.description}
            </p>
            <p className="text-sm font-body text-foreground/75 mt-0.5 max-w-[58%]">
              Follow today's <span className="font-semibold text-saffron-deep">வழிபாடு</span>
            </p>

            {/* Visit Nearby Temple CTA */}
            <button
              type="button"
              onClick={() => navigate("/nearby")}
              className="mt-3.5 flex items-center gap-1.5 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] w-fit"
              style={{
                background: "linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--saffron-light)) 100%)",
                boxShadow: "0 4px 14px -3px hsl(var(--saffron) / 0.4)",
              }}
            >
              Visit Nearby Temple
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Can't visit temple? Section */}
        <div
          className="mt-2.5 rounded-2xl border border-saffron-glow/15 px-4 py-4"
          style={{
            background: "linear-gradient(135deg, hsl(var(--warm-cream)) 0%, hsl(30 40% 94%) 100%)",
          }}
        >
          <p className="font-display text-base font-semibold text-foreground leading-snug">
            Can't visit temple?
          </p>
          <p className="text-sm font-body text-foreground/70 mt-1">
            <span className="font-semibold text-foreground/85">Begin</span> today's sacred practice from home.
          </p>

          {/* Steps row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-body text-foreground/70">
              <span className="text-sm">🪔</span> Prepare
            </span>
            <span className="text-saffron/40 text-xs">✦</span>
            <span className="flex items-center gap-1 text-xs font-body text-foreground/70">
              <span className="text-sm">🌿</span> Offer
            </span>
            <span className="text-saffron/40 text-xs">✦</span>
            <span className="flex items-center gap-1 text-xs font-body text-foreground/70">
              <span className="text-sm">🔱</span> Chant
            </span>
            <span className="text-saffron/40 text-xs">✦</span>
            <span className="flex items-center gap-1 text-xs font-body text-foreground/70">
              <span className="text-sm">✨</span> Be Still
            </span>
          </div>

          {/* Begin Today CTA */}
          <button
            onClick={() => navigate("/ritual")}
            className="mt-4 flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-body text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--saffron-light)) 100%)",
              boxShadow: "0 4px 14px -3px hsl(var(--saffron) / 0.35)",
            }}
          >
            Begin Today's வழிபாடு
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer italic */}
        <p className="text-[11px] font-body text-muted-foreground mt-3 mb-1 italic text-center">
          {tithiData.tithi.toLowerCase().includes('ekadashi') ? 'Fasting observed today' : 'Sacred observances recommended'} · Next Ekadashi in {tithiData.nextEkadashi} {tithiData.nextEkadashi === 1 ? 'day' : 'days'}
        </p>
      </div>
    </section>
  );
};

export default SacredToday;
