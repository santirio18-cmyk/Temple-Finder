import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DiyaLamp from "@/components/DiyaLamp";
import { getTodayMantra } from "@/services/panchangService";

const steps = [
  {
    number: 1,
    title: "Prepare",
    tamil: "அமைப்பு",
    emoji: "🪔",
    instruction: "Sit comfortably. If possible, light a diya or simply pause where you are.",
    visual: "diya",
  },
  {
    number: 2,
    title: "Offer",
    tamil: "படையல்",
    emoji: "🌿",
    instruction: "Offer a flower, a fruit, or simply your sincere thought to the divine.",
    visual: "flower",
  },
  {
    number: 3,
    title: "Chant",
    tamil: "ஜபம்",
    emoji: "🔱",
    instruction: "", // filled from today’s panchang (Trinity)
    visual: "chant",
  },
  {
    number: 4,
    title: "Be Still",
    tamil: "அமைதி",
    emoji: "✨",
    instruction: "Close your eyes. Sit in silence for a moment. Feel the grace within you.",
    visual: "peace",
  },
];

const Ritual = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [chantInstruction, setChantInstruction] = useState(
    "Chant your ishta mantra 11 times with devotion."
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      setChantInstruction(`${getTodayMantra()} Repeat softly 11 times.`);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setChantInstruction(`${getTodayMantra()} Repeat softly 11 times.`);
      },
      () => setChantInstruction(`${getTodayMantra()} Repeat softly 11 times.`),
      { maximumAge: 300_000, timeout: 10_000 }
    );
  }, []);

  const step = steps[currentStep];
  const instruction =
    currentStep === 2 ? chantInstruction : step.instruction;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen max-w-lg mx-auto flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(35 50% 96%) 0%, hsl(30 45% 93%) 40%, hsl(28 40% 90%) 100%)",
      }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-0 pt-10 pb-8 px-8">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold transition-all duration-500 ${
                i === currentStep
                  ? "text-primary-foreground"
                  : i < currentStep
                  ? "text-primary-foreground"
                  : "border-2 text-muted-foreground/50"
              }`}
              style={
                i === currentStep
                  ? {
                      background: "linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--temple-gold)) 100%)",
                      boxShadow: "0 0 16px 3px hsl(var(--saffron-glow) / 0.35)",
                    }
                  : i < currentStep
                  ? {
                      background: "linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--temple-gold)) 100%)",
                    }
                  : {
                      borderColor: "hsl(var(--temple-gold-light))",
                    }
              }
            >
              {s.number}
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-10 h-[2px] transition-all duration-500"
                style={{
                  background: i < currentStep
                    ? "hsl(var(--temple-gold))"
                    : "hsl(var(--temple-gold-light) / 0.4)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-8">
        {/* Icon + Title */}
        <div className="text-center mb-8">
          <span className="text-3xl mb-3 block">{step.emoji}</span>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            {step.title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--temple-gold) / 0.5))" }} />
            <span className="text-sm font-body font-medium text-saffron-deep">
              {step.tamil}
            </span>
            <div className="w-8 h-[1px]" style={{ background: "linear-gradient(90deg, hsl(var(--temple-gold) / 0.5), transparent)" }} />
          </div>
        </div>

        {/* Instruction */}
        <p className="text-center font-body text-lg text-foreground/70 leading-relaxed max-w-[280px] mb-12">
          {instruction}
        </p>

        {/* Visual Anchor - Diya */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, hsl(35 100% 60% / 0.25) 0%, transparent 70%)",
              width: "200px",
              height: "200px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <DiyaLamp size={80} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-8 pb-10 pt-4">
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-body text-base font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            background: currentStep < steps.length - 1
              ? "linear-gradient(135deg, hsl(30 30% 92%) 0%, hsl(35 25% 88%) 100%)"
              : "linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--saffron-light)) 100%)",
            color: currentStep < steps.length - 1
              ? "hsl(var(--foreground))"
              : "hsl(var(--primary-foreground))",
            boxShadow: currentStep < steps.length - 1
              ? "0 2px 10px -2px hsl(30 20% 70% / 0.3)"
              : "0 4px 14px -3px hsl(var(--saffron) / 0.4)",
          }}
        >
          {currentStep < steps.length - 1 ? "Next" : "Complete 🙏"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Ritual;
