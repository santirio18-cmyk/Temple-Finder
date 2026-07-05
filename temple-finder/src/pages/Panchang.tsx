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

  const getWeekDates = () => {
    const current = new Date(today);
    const dayOfWeek = current.getDay();
    const monday = new Date(current);
    monday.setDate(current.getDate() - ((dayOfWeek + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();

  const data = useMemo(
    () => getPanchangForDate(selectedDate, lat, lng),
    [selectedDate, lat, lng]
  );

  const auspiciousTimings = data.auspiciousTimings;
  const inauspiciousTimings = data.inauspiciousTimings;

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
              <button type="button" aria-label="Previous week" className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-base font-display font-semibold text-foreground">{data.tamilMonthLabel}</span>
              <button type="button" aria-label="Next week" className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="w-5 h-5" />
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

      {/* AUSPICIOUS TIMINGS - Good Times */}
      <div className="px-3 mb-4">
        <div
          className="rounded-xl border-2 shadow-card-warm p-5 relative overflow-hidden"
          style={{
            backgroundColor: 'hsl(142, 70%, 97%)',
            borderColor: 'hsl(142, 50%, 70%)',
          }}
        >
          <div
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
            style={{
              background: 'linear-gradient(to bottom, hsl(142, 70%, 50%), hsl(142, 70%, 60%))',
            }}
          />

          <div className="pl-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✅</span>
              <h3 className="text-lg font-display font-bold" style={{ color: 'hsl(142, 70%, 35%)' }}>
                Auspicious Timings
              </h3>
            </div>
            <p className="text-xs font-body mb-4" style={{ color: 'hsl(142, 50%, 40%)' }}>
              🙏 Best times for new beginnings, worship, and important activities
            </p>
            <div className="grid grid-cols-2 gap-4">
              {auspiciousTimings.map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'hsl(142, 60%, 90%)',
                      border: '2px solid hsl(142, 60%, 70%)',
                    }}
                  >
                    <span className="text-lg">{item.emoji}</span>
                  </div>
                  <div>
                    <p className="text-sm font-body font-semibold leading-tight" style={{ color: 'hsl(142, 70%, 30%)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs font-body mt-0.5" style={{ color: 'hsl(142, 50%, 45%)' }}>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INAUSPICIOUS TIMINGS - Times to Avoid */}
      <div className="px-3 mb-4">
        <div
          className="rounded-xl border-2 shadow-card-warm p-5 relative overflow-hidden"
          style={{
            backgroundColor: 'hsl(0, 70%, 97%)',
            borderColor: 'hsl(0, 50%, 70%)',
          }}
        >
          <div
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
            style={{
              background: 'linear-gradient(to bottom, hsl(0, 70%, 50%), hsl(0, 70%, 60%))',
            }}
          />

          <div className="pl-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚠️</span>
              <h3 className="text-lg font-display font-bold" style={{ color: 'hsl(0, 70%, 35%)' }}>
                Inauspicious Timings
              </h3>
            </div>
            <p className="text-xs font-body mb-4" style={{ color: 'hsl(0, 50%, 40%)' }}>
              ⏰ Avoid starting new ventures or important tasks during these periods
            </p>
            <div className="grid grid-cols-2 gap-4">
              {inauspiciousTimings.map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'hsl(0, 60%, 90%)',
                      border: '2px solid hsl(0, 60%, 70%)',
                    }}
                  >
                    <span className="text-lg">{item.emoji}</span>
                  </div>
                  <div>
                    <p className="text-sm font-body font-semibold leading-tight" style={{ color: 'hsl(0, 70%, 30%)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs font-body mt-0.5" style={{ color: 'hsl(0, 50%, 45%)' }}>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
