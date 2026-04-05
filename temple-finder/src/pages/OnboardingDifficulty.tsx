import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Check } from "lucide-react";
import onboardingBg from "@/assets/onboarding-bg.png";

const options = [
  "I forget important days",
  "I don't know which temple to visit",
  "I don't get time",
  "I want guidance on what to do",
  "I just want to feel more connected",
];

const OnboardingDifficulty = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen max-w-lg mx-auto relative flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${onboardingBg})` }}
      />

      {/* Kolam watermark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Ccircle cx='50' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='50' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='150' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='150' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='250' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='350' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-10 pb-10">
        {/* Back arrow */}
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/40 backdrop-blur-sm flex items-center justify-center shadow-card-warm mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-foreground/70" />
        </button>

        {/* User icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center shadow-card-warm border border-saffron/30">
            <User className="w-8 h-8 text-saffron" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-display font-bold text-foreground text-center leading-snug mb-2">
          What feels difficult when it comes to temple visits or devotion?
        </h1>
        <p className="text-sm font-body italic text-foreground/50 text-center mb-8">
          We'll personalize your spiritual journey.
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8">
          {options.map((option, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm text-left ${
                  isSelected
                    ? "bg-card/70 shadow-lg ring-2 ring-saffron"
                    : "bg-card/40 shadow-card-warm"
                }`}
              >
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "border-saffron bg-saffron"
                      : "border-foreground/30 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm font-body font-medium text-foreground/80">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Bottom buttons */}
        <div className="flex flex-col items-center gap-3">
          {selected !== null && (
            <button
              onClick={() => navigate("/onboarding/deity")}
              className="w-full py-4 rounded-full font-body font-bold text-lg text-primary-foreground shadow-temple transition-all active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(28, 95%, 50%) 50%, hsl(24, 90%, 45%) 100%)",
              }}
            >
              Next →
            </button>
          )}
          <button
            onClick={() => navigate("/onboarding/deity")}
            className="text-sm font-body font-semibold text-foreground/70 hover:text-foreground transition-colors self-start"
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDifficulty;
