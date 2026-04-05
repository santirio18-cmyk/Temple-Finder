import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import onboardingBg from "@/assets/onboarding-bg.png";
import vishnuNamam from "@/assets/vishnu-namam.png";
import shivaTilak from "@/assets/shiva-trishul.png";
import muruganVel from "@/assets/murugan-vel.png";
import lakshmiLotus from "@/assets/lakshmi-lotus.png";
import ganeshaTrunk from "@/assets/ganesha-trunk.png";
import hanumanGada from "@/assets/hanuman-gada.png";
import ayyappaBell from "@/assets/ayyappa-bell.png";
import ammanKumkum from "@/assets/amman-kumkum.png";
import krishnaFeather from "@/assets/krishna-feather.png";
import omSymbolImg from "@/assets/om-symbol.png";

const deities = [
  { id: "vishnu", name: "Vishnu", symbol: "𑁍" , fallback: "🔱", svgIcon: "namam" },
  { id: "shiva", name: "Shiva", symbol: "≡", fallback: "☰", svgIcon: "trishul" },
  { id: "murugan", name: "Murugan", symbol: "⚔", fallback: "🪷", svgIcon: "vel" },
  { id: "lakshmi", name: "Lakshmi", symbol: "✿", fallback: "🪷", svgIcon: "lotus" },
  { id: "ganesha", name: "Ganesha", symbol: "ॐ", fallback: "🕉", svgIcon: "om" },
  { id: "hanuman", name: "Hanuman", symbol: "⚒", fallback: "🏑", svgIcon: "gada" },
  { id: "amman", name: "Amman", symbol: "🔱", fallback: "🔱", svgIcon: "trident" },
  { id: "ayyappa", name: "Ayyappa", symbol: "⛰", fallback: "🎒", svgIcon: "irumudi" },
  { id: "krishna", name: "Krishna", symbol: "🪶", fallback: "🪶", svgIcon: "feather" },
];

// SVG icons for each deity
const DeityIcon = ({ type, selected }: { type: string; selected: boolean }) => {
  const color = selected ? "#C8701A" : "#B8860B";
  
  const icons: Record<string, JSX.Element> = {
    namam: (
      <img src={vishnuNamam} alt="Vishnu Namam" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.8) translateY(5%)', transformOrigin: 'center center' }} />
    ),
    trishul: (
      <img src={shivaTilak} alt="Shiva Tilak" style={{ width: '90%', height: '90%', objectFit: 'contain', transform: 'scale(1.5)', transformOrigin: 'center center' }} />
    ),
    vel: (
      <img src={muruganVel} alt="Murugan Vel" style={{ width: '90%', height: '70%', objectFit: 'contain', transform: 'scale(1.6)', transformOrigin: 'center center' }} />
    ),
    lotus: (
      <img src={lakshmiLotus} alt="Lakshmi Lotus" style={{ width: '90%', height: '90%', objectFit: 'contain', transform: 'scale(1.4) translateY(10%)', transformOrigin: 'center center' }} />
    ),
    om: (
      <img src={ganeshaTrunk} alt="Ganesha Trunk" style={{ width: '90%', height: '70%', objectFit: 'contain', transform: 'scale(1.6)', transformOrigin: 'center center' }} />
    ),
    gada: (
      <img src={hanumanGada} alt="Hanuman Gada" style={{ width: '90%', height: '90%', objectFit: 'contain', transform: 'scale(1.5) translateY(-10%)', transformOrigin: 'center center' }} />
    ),
    trident: (
      <img src={ammanKumkum} alt="Amman Kumkum" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.5) translateY(2%)', transformOrigin: 'center center' }} />
    ),
    irumudi: (
      <img src={ayyappaBell} alt="Ayyappa Bell" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.1) translateY(5%)', transformOrigin: 'center center' }} />
    ),
    feather: (
      <img src={krishnaFeather} alt="Krishna Feather" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.0)', transformOrigin: 'center center' }} />
    ),
  };

  return <>{icons[type] || <span className="text-2xl" style={{ color }}>{type}</span>}</>;
};

const OnboardingDeity = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = deities.every((d) => selected.has(d.id));

  const toggleDeity = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(deities.map((d) => d.id)));
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto relative flex flex-col overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${onboardingBg})` }}
      />

      {/* Kolam watermark at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Ccircle cx='50' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='50' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='150' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='150' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='250' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='350' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-6 pt-14 pb-10">
        {/* Heading */}
        <h1 className="text-3xl font-display font-bold text-foreground text-center leading-snug mb-2">
          Who do you feel{"\n"}most connected to?
        </h1>
        <p className="text-sm font-body italic text-foreground/50 mb-8">
          (You can select more than one)
        </p>

        {/* 3x3 Deity Grid */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-5 mb-6">
          {deities.map((deity) => {
            const isSelected = selected.has(deity.id);
            return (
              <button
                key={deity.id}
                onClick={() => toggleDeity(deity.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`relative w-[88px] h-[88px] rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-card/60 shadow-lg ring-2 ring-saffron"
                      : "bg-card/40 shadow-card-warm"
                  } backdrop-blur-sm overflow-visible`}
                >
                  <DeityIcon type={deity.svgIcon} selected={isSelected} />
                  {isSelected && (
                    <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-sacred-green flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-display font-medium text-foreground/80">
                  {deity.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* All selection button */}
        <button
          onClick={toggleAll}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <div
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
              allSelected
                ? "bg-card/60 shadow-lg ring-2 ring-saffron animate-deity-aura"
                : "bg-card/40 shadow-card-warm"
            } backdrop-blur-sm`}
          >
            <img src={omSymbolImg} alt="Om" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.0)', transformOrigin: 'center center' }} />
            {allSelected && (
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-sacred-green flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </div>
          <span className="text-sm font-display font-medium text-foreground/80">All</span>
        </button>

        <div className="flex-1" />

        {/* CTA Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-full font-body font-bold text-lg text-primary-foreground shadow-temple transition-all active:scale-[0.98] mb-3"
          style={{
            background: "linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(28, 95%, 50%) 50%, hsl(24, 90%, 45%) 100%)",
          }}
        >
          Begin my journey →
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-sm font-body font-semibold text-foreground/70 hover:text-foreground transition-colors"
        >
          Skip →
        </button>
      </div>
    </div>
  );
};

export default OnboardingDeity;
