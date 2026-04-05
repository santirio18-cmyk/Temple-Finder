const DiyaLamp = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow aura */}
      <div
        className="absolute rounded-full animate-diya-glow"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          background: "radial-gradient(circle, hsl(35, 100%, 60%, 0.3) 0%, transparent 70%)",
        }}
      />
      <svg width={size} height={size * 1.1} viewBox="0 0 40 44" className="relative z-10">
        {/* Flame */}
        <g className="animate-flame-flicker origin-bottom">
          <ellipse cx="20" cy="10" rx="4" ry="8" fill="hsl(40, 100%, 55%)" opacity="0.9" />
          <ellipse cx="20" cy="11" rx="2.5" ry="5" fill="hsl(45, 100%, 70%)" opacity="0.8" />
          <ellipse cx="20" cy="12" rx="1.2" ry="3" fill="hsl(50, 100%, 90%)" />
        </g>
        {/* Wick */}
        <line x1="20" y1="18" x2="20" y2="22" stroke="hsl(20, 30%, 30%)" strokeWidth="1" />
        {/* Oil bowl */}
        <path
          d="M10,24 Q10,20 20,20 Q30,20 30,24 L28,30 Q28,34 20,36 Q12,34 12,30 Z"
          fill="url(#diyaBrass)"
        />
        {/* Base */}
        <ellipse cx="20" cy="38" rx="10" ry="3" fill="hsl(35, 60%, 40%)" />
        {/* Oil shine */}
        <ellipse cx="18" cy="25" rx="4" ry="2" fill="hsl(40, 80%, 55%)" opacity="0.3" />
        <defs>
          <linearGradient id="diyaBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(38, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(30, 60%, 40%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DiyaLamp;
