import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sunrise, Sunset } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { NAKSHATRA_LIST, chandrashtamaNakshatra, getChandrashtamaPeriods } from "@/constants/nakshatras";
import {
  getPanchangForDate,
  getChandrashtamaFromPeriods,
  getMonthCalendar,
  DEFAULT_LAT,
  DEFAULT_LNG,
  type LunarPeriod,
  type CalendarDaySummary,
} from "@/services/panchangService";
import { getMajorFestivalsForMonth, getUpcomingMajorFestivals, type TamilFestival } from "@/services/tamilMajorFestivals";

function formatPeriodLine(period: LunarPeriod, showTamil = false): string {
  const label = showTamil && period.tamil ? `${period.name} (${period.tamil})` : period.name
  return `${label} until ${period.end}`
}

const Panchang = () => {
  const { birthNakshatra, setBirthNakshatra } = useUser();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [monthCells, setMonthCells] = useState<CalendarDaySummary[]>([]);
  const [monthLoading, setMonthLoading] = useState(false);
  const [monthFestivals, setMonthFestivals] = useState<TamilFestival[]>([]);
  const [upcomingFestivals, setUpcomingFestivals] = useState<TamilFestival[]>([]);
  const [monthCursor, setMonthCursor] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
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

  const goToPreviousMonth = () => {
    setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthTitle = monthCursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const data = useMemo(
    () => getPanchangForDate(selectedDate, lat, lng),
    [selectedDate, lat, lng]
  );

  const chandrashtama = useMemo(
    () => getChandrashtamaFromPeriods(data.nakshatraPeriods, birthNakshatra),
    [data.nakshatraPeriods, birthNakshatra]
  );

  const chandrashtamaToday = useMemo(
    () => getChandrashtamaPeriods(data.nakshatraPeriods),
    [data.nakshatraPeriods]
  );

  useEffect(() => {
    if (calendarView !== "month") return;
    setMonthLoading(true);
    const timer = window.setTimeout(() => {
      setMonthCells(getMonthCalendar(monthCursor.getFullYear(), monthCursor.getMonth(), lat, lng));
      setMonthFestivals(getMajorFestivalsForMonth(monthCursor.getFullYear(), monthCursor.getMonth(), lat, lng));
      setMonthLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [calendarView, monthCursor, lat, lng]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUpcomingFestivals(getUpcomingMajorFestivals(today, lat, lng, 4));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [lat, lng]);

  const chandrashtamaStarLabel = birthNakshatra
    ? chandrashtamaNakshatra(birthNakshatra)
    : null;

  const auspiciousTimings = data.auspiciousTimings;
  const inauspiciousTimings = data.inauspiciousTimings;
  const auspiciousDays = data.auspiciousDays;
  const gowri = data.gowriPanchangam;

  const dateTitle = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

          <div className="pl-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground text-sm">📅</span>
              <h2 className="text-lg font-display font-bold text-foreground">
                {selectedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", year: "numeric" })}
              </h2>
            </div>
            <p className="text-sm font-body text-foreground ml-6 mb-1">
              <span className="font-semibold text-saffron">{data.tamilMonthRoman}</span>
              <span className="text-muted-foreground"> ({data.tamilMonthLabel})</span>
              <span className="text-muted-foreground"> · </span>
              <span className="font-medium">{data.tamilPaksha}</span>
            </p>
            <p className="text-xs font-body text-muted-foreground ml-6 mb-4">
              {data.tithi} · {data.tamilPaksha} · Sun in {data.raasi}
            </p>

            <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden mb-3">
              <table className="w-full text-sm font-body">
                <tbody>
                  <tr className="border-b border-[hsl(var(--temple-gold)/0.12)]">
                    <td className="px-3 py-2.5 align-top font-semibold text-saffron w-[5.5rem] whitespace-nowrap">
                      Tithi
                    </td>
                    <td className="px-3 py-2.5 align-top text-foreground/90 leading-relaxed">
                      {data.tithiPeriods.map((period, i) => (
                        <p key={`tithi-${i}`} className={i > 0 ? "mt-1" : ""}>
                          {i > 0 && <span className="text-muted-foreground">then </span>}
                          {formatPeriodLine(period)}
                        </p>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-b border-[hsl(var(--temple-gold)/0.12)]">
                    <td className="px-3 py-2.5 align-top font-semibold text-saffron w-[5.5rem] whitespace-nowrap">
                      Nakshatra
                    </td>
                    <td className="px-3 py-2.5 align-top text-foreground/90 leading-relaxed">
                      {data.nakshatraPeriods.map((period, i) => (
                        <p key={`nak-${i}`} className={i > 0 ? "mt-1" : ""}>
                          {i > 0 && <span className="text-muted-foreground">then </span>}
                          {formatPeriodLine(period, true)}
                        </p>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-b border-[hsl(var(--temple-gold)/0.12)]">
                    <td className="px-3 py-2.5 align-top font-semibold text-saffron w-[5.5rem] whitespace-nowrap">
                      Yoga
                    </td>
                    <td className="px-3 py-2.5 align-top text-foreground font-medium">{data.yoga}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 align-top font-semibold text-saffron w-[5.5rem] whitespace-nowrap">
                      Paksha
                    </td>
                    <td className="px-3 py-2.5 align-top text-foreground font-medium">
                      {data.tamilPaksha} <span className="text-muted-foreground font-normal">({data.paksha})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg bg-[hsl(var(--saffron)/0.07)] border border-[hsl(var(--saffron)/0.22)] px-3 py-2.5 mb-4">
              <p className="text-[11px] leading-relaxed text-foreground/90">
                <span className="font-semibold text-saffron">Note · </span>
                Tithi and nakshatra from sunrise to next sunrise. Regional almanacs may differ slightly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/60 border border-[hsl(var(--temple-gold)/0.15)] px-3 py-2">
                <Sunrise className="w-4 h-4 text-saffron shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Sunrise</p>
                  <p className="text-sm font-body font-medium text-foreground">{data.sunrise}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/60 border border-[hsl(var(--temple-gold)/0.15)] px-3 py-2">
                <Sunset className="w-4 h-4 text-saffron shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Sunset</p>
                  <p className="text-sm font-body font-medium text-foreground">{data.sunset}</p>
                </div>
              </div>
            </div>

            <p className="text-sm font-body italic border-t border-[hsl(var(--temple-gold)/0.2)] pt-3 font-medium text-foreground/80">
              {data.mantra}
            </p>
          </div>
        </div>
      </div>

      {/* Chandrashtama + birth nakshatra */}
      <div className="px-3 mb-4">
        <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />
          <div className="pl-3">
            <h3 className="text-base font-display font-bold text-foreground mb-1">
              Chandrashtama (சந்திராஷ்டமம்)
            </h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              Moon in the 8th nakshatra from birth star — avoid major new beginnings
            </p>

            <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden mb-4">
              <table className="w-full text-sm font-body">
                <tbody>
                  <tr className="border-b border-[hsl(var(--temple-gold)/0.12)] bg-[hsl(var(--saffron)/0.04)]">
                    <td colSpan={2} className="px-3 py-2 text-xs font-semibold text-saffron uppercase tracking-wide">
                      Chandrashtama today
                    </td>
                  </tr>
                  {chandrashtamaToday.map((row, i) => {
                    const isYours =
                      birthNakshatra &&
                      row.birthNakshatra.toLowerCase() === birthNakshatra.toLowerCase();
                    const moonLabel = row.moonNakshatraTamil
                      ? `${row.moonNakshatra} (${row.moonNakshatraTamil})`
                      : row.moonNakshatra;
                    const birthLabel = row.birthNakshatraTamil
                      ? `${row.birthNakshatra} (${row.birthNakshatraTamil})`
                      : row.birthNakshatra;
                    return (
                      <tr
                        key={`ch-period-${i}`}
                        className={`border-b border-[hsl(var(--temple-gold)/0.1)] last:border-b-0 ${
                          isYours ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="px-3 py-2.5 align-top font-semibold text-saffron w-[5.5rem] whitespace-nowrap">
                          {i === 0 ? "Moon in" : "then"}
                        </td>
                        <td className="px-3 py-2.5 align-top leading-relaxed">
                          <p className="text-foreground/90">
                            <span className="font-medium text-foreground">{moonLabel}</span>
                            <span className="text-muted-foreground"> until {row.until}</span>
                          </p>
                          <p className={`text-xs mt-1 ${isYours ? "text-red-800 font-semibold" : "text-muted-foreground"}`}>
                            Birth star in Chandrashtama:{" "}
                            <span className={isYours ? "text-red-900" : "text-foreground font-medium"}>
                              {birthLabel}
                            </span>
                            {isYours && " · You"}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <label className="text-xs font-semibold text-foreground block mb-1">Your birth nakshatra</label>
            <select
              value={birthNakshatra}
              onChange={(e) => setBirthNakshatra(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm bg-white text-foreground mb-3"
            >
              <option value="">Choose nakshatra…</option>
              {NAKSHATRA_LIST.map((n) => (
                <option key={n.name} value={n.name}>
                  {n.name} ({n.tamil})
                </option>
              ))}
            </select>
            {birthNakshatra && chandrashtamaStarLabel && (
              <p className="text-xs text-muted-foreground mb-2">
                Your 8th star: <span className="font-semibold text-foreground">{chandrashtamaStarLabel}</span>
                <span className="block text-[10px] mt-0.5">Saved in Profile</span>
              </p>
            )}
            {chandrashtama?.active ? (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-900">
                <span className="font-bold">Active for you today</span>
                {chandrashtama.until ? ` until ${chandrashtama.until}` : ""}
              </div>
            ) : birthNakshatra ? (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-sm text-emerald-900">
                Not active for you on this day
              </div>
            ) : (
              <div className="rounded-lg bg-[hsl(var(--saffron)/0.06)] border border-[hsl(var(--temple-gold)/0.2)] px-3 py-2.5 text-sm text-muted-foreground">
                Set birth nakshatra to get alerts (or from Kundli / Profile)
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
      </div>

      <div className="px-3 mb-4">
        <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

          <div className="pl-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex rounded-lg border border-[hsl(var(--temple-gold)/0.3)] overflow-hidden text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCalendarView("week")}
                  className={`px-3 py-1.5 ${calendarView === "week" ? "bg-[hsl(var(--saffron))] text-white" : "text-foreground"}`}
                >
                  Week
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarView("month")}
                  className={`px-3 py-1.5 ${calendarView === "month" ? "bg-[hsl(var(--saffron))] text-white" : "text-foreground"}`}
                >
                  Month
                </button>
              </div>
            </div>

            {calendarView === "week" ? (
              <>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={goToPreviousWeek}
                    aria-label="Previous week"
                    className="text-muted-foreground hover:text-saffron transition-colors active:scale-95 p-2 rounded-full hover:bg-[hsl(var(--temple-gold)/0.1)]"
                  >
                    <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                  <span className="text-base font-display font-semibold text-foreground min-w-[140px] text-center">
                    {data.tamilMonthRoman}
                    <span className="block text-xs font-body text-muted-foreground">{data.tamilMonthLabel}</span>
                  </span>
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
                    const isTodayDate = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                    const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
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
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    aria-label="Previous month"
                    className="text-muted-foreground hover:text-saffron transition-colors active:scale-95 p-2 rounded-full hover:bg-[hsl(var(--temple-gold)/0.1)]"
                  >
                    <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                  <span className="text-base font-display font-semibold text-foreground min-w-[160px] text-center">
                    {monthTitle}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextMonth}
                    aria-label="Next month"
                    className="text-muted-foreground hover:text-saffron transition-colors active:scale-95 p-2 rounded-full hover:bg-[hsl(var(--temple-gold)/0.1)]"
                  >
                    <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <div key={day} className="text-center text-[10px] font-body font-medium text-muted-foreground py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {monthLoading ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">Loading month…</div>
                ) : (
                <div className="grid grid-cols-7 gap-0.5">
                  {monthCells.map((cell) => {
                    if (!cell.inMonth) {
                      return <div key={cell.date.toISOString()} className="min-h-[52px]" />;
                    }
                    const isTodayDate =
                      cell.date.getDate() === today.getDate() &&
                      cell.date.getMonth() === today.getMonth() &&
                      cell.date.getFullYear() === today.getFullYear();
                    const isSelected =
                      cell.date.getDate() === selectedDate.getDate() &&
                      cell.date.getMonth() === selectedDate.getMonth() &&
                      cell.date.getFullYear() === selectedDate.getFullYear();
                    return (
                      <button
                        key={cell.date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(new Date(cell.date))}
                        className={`min-h-[52px] rounded-md p-0.5 text-left transition-all border ${
                          isSelected
                            ? "bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] text-white border-transparent shadow-temple"
                            : isTodayDate
                              ? "ring-1 ring-[hsl(var(--saffron)/0.5)] border-[hsl(var(--temple-gold)/0.2)] bg-white"
                              : "border-[hsl(var(--temple-gold)/0.15)] bg-white hover:bg-[hsl(var(--temple-gold)/0.06)]"
                        }`}
                      >
                        <span className={`block text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-foreground"}`}>
                          {cell.day}
                        </span>
                        <span className={`block text-[8px] leading-tight truncate ${isSelected ? "text-white/90" : "text-saffron"}`}>
                          {cell.tithiShort}
                        </span>
                        <span className={`block text-[8px] leading-tight truncate ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                          {cell.nakshatraShort}
                        </span>
                        {cell.festival && (
                          <span className={`block text-[7px] leading-tight truncate font-semibold ${isSelected ? "text-white" : "text-red-700"}`}>
                            ★
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                )}
                <p className="text-[10px] text-muted-foreground mt-2">★ festival day</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Major festivals this month */}
      {(monthFestivals.length > 0 || upcomingFestivals.length > 0) && (
        <div className="px-3 mb-4">
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />
            <div className="pl-3">
              <h3 className="text-base font-display font-bold text-foreground mb-1">Major Tamil Festivals</h3>
              <p className="text-[11px] text-muted-foreground mb-3">Panguni Uthiram · Aadi Perukku · Karthigai Deepam</p>
              {monthFestivals.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-foreground mb-2">This month</p>
                  <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                    {monthFestivals.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedDate(new Date(f.date))}
                        className="w-full text-left px-3 py-2.5 text-sm border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0 hover:bg-[hsl(var(--saffron)/0.06)]"
                      >
                        <span className="font-semibold text-foreground">{f.name}</span>
                        <span className="text-muted-foreground"> ({f.tamil})</span>
                        <span className="block text-xs text-saffron mt-0.5">{f.dateLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {upcomingFestivals.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Upcoming</p>
                  <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                    {upcomingFestivals.map((f) => (
                      <button
                        key={`up-${f.id}-${f.dateLabel}`}
                        type="button"
                        onClick={() => {
                          setSelectedDate(new Date(f.date));
                          setMonthCursor(new Date(f.date.getFullYear(), f.date.getMonth(), 1));
                        }}
                        className="w-full text-left px-3 py-2.5 text-sm border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0 hover:bg-[hsl(var(--saffron)/0.06)]"
                      >
                        <span className="font-semibold text-foreground">{f.name}</span>
                        <span className="block text-xs text-muted-foreground">{f.dateLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NALLA NERAM & GOWRI NALLA NERAM */}
      {gowri && (
        <div className="px-3 mb-4">
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />
            <div className="pl-3">
              <h3 className="text-base font-display font-bold text-foreground mb-1">
                Nalla Neram & Gowri Nalla Neram
              </h3>
              <p className="text-[11px] text-muted-foreground mb-4">{dateTitle}</p>
              <div className="overflow-x-auto rounded-lg border border-[hsl(var(--temple-gold)/0.2)]">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-[hsl(var(--saffron)/0.08)]">
                      <th className="text-left px-3 py-2 font-semibold text-foreground">Nalla Neram (நல்ல நேரம்)</th>
                      <th className="text-left px-3 py-2 font-semibold text-foreground">Gowri Nalla Neram (கௌரி நல்ல நேரம்)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[hsl(var(--temple-gold)/0.15)]">
                      <td className="px-3 py-2.5">
                        <span className="text-xs text-muted-foreground block">Morning (காலை)</span>
                        <span className="font-semibold text-emerald-800">{gowri.nallaNeram.morning}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs text-muted-foreground block">Day (பகல்)</span>
                        <span className="font-semibold text-emerald-800">{gowri.nallaNeram.gowriDay}</span>
                      </td>
                    </tr>
                    <tr className="border-t border-[hsl(var(--temple-gold)/0.15)]">
                      <td className="px-3 py-2.5">
                        <span className="text-xs text-muted-foreground block">Evening (மாலை)</span>
                        <span className="font-semibold text-emerald-800">{gowri.nallaNeram.evening}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs text-muted-foreground block">Night (இரவு)</span>
                        <span className="font-semibold text-emerald-800">{gowri.nallaNeram.gowriNight}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOWRI PANCHANGAM */}
      {gowri && (
        <div className="px-3 mb-4">
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />
            <div className="pl-3">
              <h3 className="text-base font-display font-bold text-foreground mb-1">Gowri Panchangam</h3>
              <p className="text-[11px] text-muted-foreground mb-4">
                Auspicious (green) and inauspicious (red) timings · * next calendar day
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Day (பகல்)</p>
                  <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                    <table className="w-full text-xs font-body">
                      <tbody>
                        {gowri.day.map((row) => (
                          <tr
                            key={`day-${row.name}-${row.time}`}
                            className={row.auspicious ? 'bg-emerald-50' : 'bg-red-50'}
                          >
                            <td className={`px-2.5 py-2 font-bold ${row.auspicious ? 'text-emerald-900' : 'text-red-900'}`}>
                              {row.name}
                            </td>
                            <td className={`px-2.5 py-2 text-right font-medium ${row.auspicious ? 'text-emerald-800' : 'text-red-800'}`}>
                              {row.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Night (இரவு)</p>
                  <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                    <table className="w-full text-xs font-body">
                      <tbody>
                        {gowri.night.map((row) => (
                          <tr
                            key={`night-${row.name}-${row.time}`}
                            className={row.auspicious ? 'bg-emerald-50' : 'bg-red-50'}
                          >
                            <td className={`px-2.5 py-2 font-bold ${row.auspicious ? 'text-emerald-900' : 'text-red-900'}`}>
                              {row.name}
                            </td>
                            <td className={`px-2.5 py-2 text-right font-medium ${row.auspicious ? 'text-emerald-800' : 'text-red-800'}`}>
                              {row.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Auspicious</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Inauspicious</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-8 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
      </div>

      {/* MUHURTAS, VARJYAM & DURMUHURTAM */}
      {(auspiciousTimings.length > 0 || inauspiciousTimings.length > 0 || data.varjyam.length > 0) && (
        <div className="px-3 mb-4">
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />
            <div className="pl-3">
              <h3 className="text-base font-display font-bold text-foreground mb-1">
                Muhurtas, Varjyam & Durmuhurtam
              </h3>
              <p className="text-[11px] text-muted-foreground mb-4">
                Special auspicious windows and periods to avoid
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {auspiciousTimings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                      Auspicious (நல்ல நேரம்)
                    </p>
                    <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                      <table className="w-full text-xs font-body">
                        <tbody>
                          {auspiciousTimings.map((item) => (
                            <tr key={item.name} className="bg-emerald-50 border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0">
                              <td className="px-2.5 py-2 font-bold text-emerald-900">
                                {item.name}
                              </td>
                              <td className="px-2.5 py-2 text-right font-medium text-emerald-800">
                                {item.time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {inauspiciousTimings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                      Durmuhurtam (தவிர்க்க வேண்டிய நேரம்)
                    </p>
                    <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                      <table className="w-full text-xs font-body">
                        <tbody>
                          {inauspiciousTimings.map((item) => (
                            <tr key={item.name} className="bg-red-50 border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0">
                              <td className="px-2.5 py-2 font-bold text-red-900">
                                {item.name}
                              </td>
                              <td className="px-2.5 py-2 text-right font-medium text-red-800">
                                {item.time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {data.varjyam.length > 0 && (
                  <div className={inauspiciousTimings.length > 0 ? "sm:col-span-2" : ""}>
                    <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                      Varjyam (வர்ஜ்யம்)
                    </p>
                    <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                      <table className="w-full text-xs font-body">
                        <tbody>
                          {data.varjyam.map((item, idx) => (
                            <tr key={`varjyam-${idx}`} className="bg-red-50 border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0">
                              <td className="px-2.5 py-2 font-bold text-red-900">
                                {item.nakshatra}
                              </td>
                              <td className="px-2.5 py-2 text-right font-medium text-red-800">
                                {item.time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">Inauspicious nakshatra window — avoid new ventures</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Auspicious
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Avoid
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUSPICIOUS DAYS - Special Sacred Days */}
      {auspiciousDays.length > 0 && (
        <div className="px-3 mb-4">
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 relative overflow-hidden">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

            <div className="pl-3">
              <h3 className="text-base font-display font-bold text-foreground mb-1">
                Today&apos;s Special Day
              </h3>
              <p className="text-[11px] text-muted-foreground mb-3">
                Observe special prayers and rituals
              </p>
              <div className="rounded-lg border border-[hsl(var(--temple-gold)/0.2)] overflow-hidden">
                {auspiciousDays.map((day, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2.5 text-sm font-body font-semibold text-foreground bg-[hsl(var(--saffron)/0.06)] border-t border-[hsl(var(--temple-gold)/0.1)] first:border-t-0"
                  >
                    {day}
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
