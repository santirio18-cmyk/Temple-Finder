import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sunrise, Sunset } from "lucide-react";
import vishnuTilak from "@/assets/panchang/vishnu-tilak.png";
import {
  getPanchangForDate,
  DEFAULT_LAT,
  DEFAULT_LNG,
} from "@/services/panchangService";

const Panchang = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekStartDate, setWeekStartDate] = useState<Date>(() => {
    // Initialize with Monday of current week
    const current = new Date(today);
    const dayOfWeek = current.getDay();
    const monday = new Date(current);
    monday.setDate(current.getDate() - ((dayOfWeek + 6) % 7));
    return monday;
  });
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [locLabel, setLocLabel] = useState<string>("Chennai area (default)");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocLabel("Your location");
      },
      () => {
        setLocLabel("Default location (enable GPS for accuracy)");
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 }
    );
  }, []);

  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates(weekStartDate);

  const goToPreviousWeek = () => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(newStart);
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(newStart);
  };

  const data = useMemo(
    () => getPanchangForDate(selectedDate, lat, lng),
    [selectedDate, lat, lng]
  );

  const auspiciousTimings = data.auspiciousTimings;
  const inauspiciousTimings = data.inauspiciousTimings;
  const auspiciousDays = data.auspiciousDays;

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-24">
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-lg mx-auto">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M100 10 Q115 50 100 100 Q85 50 100 10' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M190 100 Q150 115 100 100 Q150 85 190 100' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M100 190 Q85 150 100 100 Q115 150 100 190' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M10 100 Q50 85 100 100 Q50 115 10 100' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M163.6 36.4 Q130 65 100 100 Q65 65 163.6 36.4' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M163.6 163.6 Q130 135 100 100 Q135 130 163.6 163.6' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M36.4 163.6 Q65 135 100 100 Q65 130 36.4 163.6' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M36.4 36.4 Q65 65 100 100 Q70 65 36.4 36.4' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="text-center pt-6 pb-4 px-3">
        <div className="inline-flex items-center gap-2">
          <span className="text-lg">🪷</span>
          <h1 className="text-2xl font-display font-bold text-shimmer-gold">
            Panchang
          </h1>
          <span className="text-lg">🪷</span>
        </div>
        <div className="mx-auto mt-1.5 w-24 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--saffron))] to-transparent" />
        <p className="text-[11px] text-muted-foreground mt-2 px-4">
          {locLabel} · {lat.toFixed(2)}°, {lng.toFixed(2)}°
        </p>
      </div>

      <div className="px-3 mb-4">
        <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

          <div className="flex justify-between items-start pl-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-muted-foreground text-sm">📅</span>
                <h2 className="text-lg font-display font-bold text-foreground">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </h2>
              </div>
              <p className="text-sm font-body text-muted-foreground ml-6 mb-4">
                ({data.tamilMonthLabel} · {data.masa} paksha)
              </p>

              <div className="space-y-1.5 mb-4">
                <p className="text-sm font-body text-foreground">
                  <span className="font-semibold text-saffron">Tithi:</span> {data.tithi} (until {data.tithiEnd})
                </p>
                <p className="text-sm font-body text-foreground">
                  <span className="font-semibold text-saffron">Nakshatra:</span> {data.nakshatra} (until {data.nakshatraEnd})
                </p>
                <p className="text-sm font-body text-foreground">
                  <span className="font-semibold text-saffron">Yoga:</span> {data.yoga}
                </p>
                <p className="text-sm font-body text-foreground">
                  <span className="font-semibold text-saffron">Paksha:</span> {data.paksha}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mb-4">
                <div className="flex items-center gap-1.5">
                  <Sunrise className="w-4 h-4 text-saffron" />
                  <span className="text-sm font-body text-foreground">Sunrise {data.sunrise}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-saffron" />
                  <span className="text-sm font-body text-foreground">Sunset {data.sunset}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 ml-3">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <img src={vishnuTilak} alt="Vishnu Tilak" className="w-[75%] h-[75%] object-contain" />
              </div>
              <span className="text-xs font-body font-medium text-foreground text-center max-w-[5rem] leading-tight">
                {data.tithi}
              </span>
            </div>
          </div>

          <p className="text-sm font-body italic text-saffron border-t border-[hsl(var(--temple-gold)/0.2)] pt-3 pl-3">
            ❝ {data.mantra} ❞
          </p>
          <p className="text-[10px] text-muted-foreground mt-2 pl-3 pr-1">{data.sourceNote}</p>
        </div>
      </div>

      <div className="px-8 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
      </div>

      <div className="px-3 mb-4">
        <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

          <div className="pl-3">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button 
                type="button" 
                onClick={goToPreviousWeek}
                aria-label="Previous week" 
                className="text-muted-foreground hover:text-saffron transition-colors active:scale-95 p-2 rounded-full hover:bg-[hsl(var(--temple-gold)/0.1)]"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>
              <span className="text-base font-display font-semibold text-foreground min-w-[140px] text-center">{data.tamilMonthLabel}</span>
              <button 
                type="button"
                onClick={goToNextWeek}
                aria-label="Next week" 
                className="text-muted-foreground hover:text-saffron transition-colors active:scale-95 p-2 rounded-full hover:bg-[hsl(var(--temple-gold)/0.1)]"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <div key={day} className="text-center text-xs font-body font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weekDates.map((date) => {
                const isTodayDate = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
                const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
                return (
                  <div key={date.toISOString()} className="flex flex-col items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(new Date(date))}
                      className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] text-white shadow-temple"
                          : isTodayDate
                            ? "ring-1 ring-[hsl(var(--saffron)/0.5)] text-foreground"
                            : "text-foreground hover:bg-[hsl(var(--temple-gold)/0.1)]"
                      }`}
                    >
                      <span className={`text-base font-body ${isSelected ? "font-bold" : "font-medium"}`}>
                        {date.getDate()}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
      </div>

      {/* AUSPICIOUS TIMINGS - Premium Gold Theme */}
      <div className="px-3 mb-4">
        <div
          className="rounded-2xl shadow-2xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFF9F0 0%, #FFFBF5 50%, #FFF9F0 100%)',
            border: '2px solid #D4AF37',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.25), 0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #FFD700, #DAA520, #B8860B)',
            }}
          />

          <div className="pl-2">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                }}
              >
                <span className="text-xl">✨</span>
              </div>
              <h3 
                className="text-xl font-display font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Auspicious Timings
              </h3>
            </div>
            <p className="text-xs font-body font-semibold mb-4 text-amber-700/80">
              🙏 Best times for new beginnings, worship, and important activities
            </p>
            <div className="space-y-3">
              {auspiciousTimings.map((item) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.04) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <p className="text-sm font-body font-bold text-amber-900">
                    {item.emoji} {item.name}
                  </p>
                  <p className="text-xs font-body font-semibold text-amber-700">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INAUSPICIOUS TIMINGS - Premium Red Theme */}
      <div className="px-3 mb-4">
        <div
          className="rounded-2xl shadow-2xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFAFA 50%, #FFF5F5 100%)',
            border: '2px solid #DC143C',
            boxShadow: '0 8px 32px rgba(220, 20, 60, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #DC143C, #C41E3A, #8B0000)',
            }}
          />

          <div className="pl-2">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #DC143C 100%)',
                  boxShadow: '0 4px 12px rgba(220, 20, 60, 0.4)',
                }}
              >
                <span className="text-xl">⚠️</span>
              </div>
              <h3 
                className="text-xl font-display font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Inauspicious Timings
              </h3>
            </div>
            <p className="text-xs font-body font-semibold mb-4 text-red-700/80">
              🚫 Avoid starting new ventures or important tasks during these periods
            </p>
            <div className="space-y-3">
              {inauspiciousTimings.map((item) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.08) 0%, rgba(220, 20, 60, 0.04) 100%)',
                    border: '1px solid rgba(220, 20, 60, 0.2)',
                  }}
                >
                  <p className="text-sm font-body font-bold text-red-900">
                    {item.emoji} {item.name}
                  </p>
                  <p className="text-xs font-body font-semibold text-red-700">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AUSPICIOUS DAYS - Special Sacred Days */}
      {auspiciousDays.length > 0 && (
        <div className="px-3 mb-4">
          <div
            className="rounded-xl border-2 shadow-card-warm p-5 relative overflow-hidden"
            style={{
              backgroundColor: 'hsl(280, 70%, 97%)',
              borderColor: 'hsl(280, 50%, 70%)',
            }}
          >
            <div
              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
              style={{
                background: 'linear-gradient(to bottom, hsl(280, 70%, 50%), hsl(280, 70%, 60%))',
              }}
            />

            <div className="pl-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🌺</span>
                <h3 className="text-lg font-display font-bold" style={{ color: 'hsl(280, 70%, 35%)' }}>
                  Today's Special Day
                </h3>
              </div>
              <p className="text-xs font-body mb-4" style={{ color: 'hsl(280, 50%, 40%)' }}>
                🙏 Observe special prayers and rituals
              </p>
              <div className="space-y-2">
                {auspiciousDays.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'hsl(280, 60%, 95%)',
                      border: '1px solid hsl(280, 50%, 85%)',
                    }}
                  >
                    <p className="text-sm font-body font-semibold" style={{ color: 'hsl(280, 70%, 30%)' }}>
                      {day}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-5 px-5">
        <p className="text-[10px] font-body text-muted-foreground italic">
          &quot;सर्वे भवन्तु सुखिनः&quot; — May all beings be happy
        </p>
        <div className="section-ornament mt-2">
          <span className="text-temple-gold text-xs">🙏</span>
        </div>
      </div>

    </div>
  );
};

export default Panchang;
