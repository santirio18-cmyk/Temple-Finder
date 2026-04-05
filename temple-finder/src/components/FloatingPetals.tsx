const FloatingPetals = () => {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: 10 + Math.random() * 14,
    opacity: 0.3 + Math.random() * 0.4,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: p.left,
            top: "-20px",
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="10"
              fill="hsl(350, 70%, 80%)"
              opacity="0.8"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="3"
              ry="7"
              fill="hsl(340, 80%, 85%)"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingPetals;
