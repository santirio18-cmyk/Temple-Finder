const GoldenBells = () => {
  const bells = [
    { left: "8%", delay: "0s", size: 28 },
    { left: "30%", delay: "0.5s", size: 22 },
    { left: "52%", delay: "1s", size: 26 },
    { left: "74%", delay: "1.5s", size: 24 },
    { left: "92%", delay: "0.8s", size: 20 },
  ];

  return (
    <div className="flex justify-around px-4 py-2 relative">
      {bells.map((bell, i) => (
        <div
          key={i}
          className="animate-bell-swing"
          style={{
            animationDelay: bell.delay,
          }}
        >
          <svg
            width={bell.size}
            height={bell.size * 1.3}
            viewBox="0 0 30 40"
            className="drop-shadow-sm"
          >
            {/* Chain */}
            <line x1="15" y1="0" x2="15" y2="8" stroke="hsl(40, 70%, 50%)" strokeWidth="1.5" />
            {/* Bell body */}
            <path
              d="M8,12 Q8,8 15,6 Q22,8 22,12 L24,28 Q24,32 15,34 Q6,32 6,28 Z"
              fill="url(#bellGold)"
              stroke="hsl(38, 60%, 40%)"
              strokeWidth="0.5"
            />
            {/* Bell clapper */}
            <circle cx="15" cy="31" r="2.5" fill="hsl(35, 70%, 35%)" />
            {/* Shine */}
            <ellipse cx="12" cy="18" rx="2" ry="5" fill="hsl(45, 90%, 75%)" opacity="0.4" />
            <defs>
              <linearGradient id="bellGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(42, 85%, 65%)" />
                <stop offset="50%" stopColor="hsl(38, 80%, 55%)" />
                <stop offset="100%" stopColor="hsl(35, 75%, 45%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default GoldenBells;
