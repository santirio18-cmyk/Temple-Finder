import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import onboardingBg from "@/assets/onboarding-bg.png";

const OnboardingLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

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
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Ccircle cx='50' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='50' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='150' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='150' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='250' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='350' cy='100' r='40' fill='none' stroke='%23C8701A' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='100' r='25' fill='none' stroke='%23C8701A' stroke-width='0.6'/%3E%3Ccircle cx='100' cy='60' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='60' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3Ccircle cx='300' cy='60' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='140' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='140' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3Ccircle cx='300' cy='140' r='30' fill='none' stroke='%23C8701A' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-8 pt-16 pb-10">
        {/* Om Symbol */}
        <div className="text-6xl mb-3" style={{ color: "#C8701A" }}>
          ॐ
        </div>

        {/* Title */}
        <h1 className="text-4xl font-display font-bold text-foreground mb-3 tracking-wide">
          Darshanam
        </h1>

        {/* Subheadings */}
        <p className="text-xl font-display font-medium text-foreground/90 mb-1">
          Begin your spiritual journey
        </p>
        <p className="text-sm font-body text-foreground/60">
          Stay connected to devotion, every day
        </p>

        {/* Spacer */}
        <div className="flex-1 min-h-[120px]" />

        {/* Phone Input */}
        <div className="w-full mb-4">
          <div className="flex items-center gap-0 bg-card/40 backdrop-blur-md rounded-full border border-border/30 overflow-hidden shadow-card-warm">
            <div className="flex items-center gap-1 pl-5 pr-3 py-3.5 border-r border-border/30">
              <span className="text-base font-body font-medium text-foreground/70">+91</span>
              <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
            </div>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3.5 text-base font-body text-foreground placeholder:text-foreground/40 outline-none"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="w-full py-4 rounded-full font-body font-bold text-lg text-primary-foreground shadow-temple transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(28, 95%, 50%) 50%, hsl(24, 90%, 45%) 100%)",
          }}
        >
          Continue
        </button>

        {/* OTP text */}
        <p className="text-xs font-body text-foreground/50 mt-3 mb-6">
          We'll send you an OTP to continue
        </p>

        {/* Navigation links */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            onClick={() => navigate("/onboarding/difficulty")}
            className="text-sm font-body font-semibold text-foreground/70 hover:text-foreground transition-colors"
          >
            Skip for now →
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-body font-semibold text-foreground/70 hover:text-foreground transition-colors"
          >
            Go to Home →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLogin;
