const festivals = [
  {
    name: "Ekadashi",
    description: "Seek the blessings of Lord Vishnu",
    date: "Mar 2",
    icon: "🪔",
    daysLeft: 5,
  },
  {
    name: "Pradosham",
    description: "Sacred evening for Lord Shiva",
    date: "Mar 8",
    icon: "🔱",
    daysLeft: 11,
  },
  {
    name: "Amavasya",
    description: "Day for ancestral prayers",
    date: "Mar 10",
    icon: "🌙",
    daysLeft: 13,
  },
];

const FestivalsSection = () => {
  return (
    <section className="px-3 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            Festivals & Tithi
          </h2>
          <p className="text-[11px] text-muted-foreground font-body mt-0.5">
            Upcoming Sacred Days
          </p>
        </div>
        <span className="text-xs font-body text-saffron font-medium cursor-pointer">
          View All →
        </span>
      </div>

      {/* Temple notice board card */}
      <div className="relative">
        {/* Outer dark brown border frame */}
        <div
          className="rounded-lg p-[3px] relative"
          style={{
            background: 'linear-gradient(135deg, hsl(20, 40%, 25%), hsl(25, 35%, 30%), hsl(20, 40%, 22%))',
          }}
        >
          {/* Decorative corner ornaments */}
          <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: 'hsl(40, 60%, 55%)' }} />
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: 'hsl(40, 60%, 55%)' }} />
          <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: 'hsl(40, 60%, 55%)' }} />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: 'hsl(40, 60%, 55%)' }} />

          {/* Inner parchment card */}
          <div
            className="rounded-md overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, hsl(38, 45%, 90%), hsl(35, 40%, 86%), hsl(33, 38%, 83%))',
            }}
          >
            {/* Top gold trim */}
            <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 55%), hsl(42, 70%, 65%), hsl(40, 60%, 55%), transparent)' }} />

            <div className="px-4 py-2">
              {festivals.map((f, i) => (
                <div key={f.name}>
                  <div className="flex items-center gap-3 py-3">
                    {/* Sacred icon */}
                    <span className="text-lg flex-shrink-0 opacity-80">{f.icon}</span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-display font-bold"
                        style={{ color: 'hsl(20, 35%, 22%)' }}
                      >
                        {f.name}
                      </p>
                      <p
                        className="text-[11px] font-body mt-0.5 italic"
                        style={{ color: 'hsl(25, 20%, 45%)' }}
                      >
                        {f.description}
                      </p>
                    </div>

                    {/* Date & countdown */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className="text-xs font-display font-semibold"
                        style={{ color: 'hsl(20, 35%, 25%)' }}
                      >
                        {f.date}
                      </span>
                      <span
                        className="text-[9px] font-body font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          background: 'hsl(24, 80%, 50%, 0.15)',
                          color: 'hsl(24, 80%, 42%)',
                        }}
                      >
                        {f.daysLeft} days left
                      </span>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  {i < festivals.length - 1 && (
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(30, 30%, 70%), transparent)' }} />
                      <span className="text-[8px] opacity-40" style={{ color: 'hsl(40, 50%, 45%)' }}>✦</span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(30, 30%, 70%), transparent)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom gold trim */}
            <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 55%), hsl(42, 70%, 65%), hsl(40, 60%, 55%), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalsSection;
