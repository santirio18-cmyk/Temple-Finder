import temple3 from "@/assets/temples/temple3.jpg";
import temple4 from "@/assets/temples/temple4.jpg";
import temple5 from "@/assets/temples/temple5.jpg";
import { Star } from "lucide-react";

const featured = [
  { name: "Kashi Vishwanath", location: "Varanasi, UP", image: temple3, rating: 4.9 },
  { name: "Tirupati Balaji", location: "Tirumala, AP", image: temple4, rating: 4.8 },
  { name: "Somnath Temple", location: "Somnath, GJ", image: temple5, rating: 4.9 },
];

const FeaturedTemples = () => {
  return (
    <section className="px-5 py-6 bg-warm-cream relative overflow-hidden">
      {/* Decorative corner lotus */}
      <div className="absolute top-2 right-4 text-3xl opacity-[0.06] select-none pointer-events-none">🪷</div>
      <div className="absolute bottom-4 left-4 text-3xl opacity-[0.06] select-none pointer-events-none">🪷</div>

      <div className="section-ornament mb-1">
        <span className="text-temple-gold text-sm">✦</span>
      </div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-1 text-center">
        Featured Temples
      </h2>
      <p className="text-xs text-muted-foreground text-center mb-5 font-body">
        Sacred pilgrimages across Bharat
      </p>

      <div className="space-y-4">
        {featured.map((t, i) => (
          <div
            key={t.name}
            className="relative rounded-2xl overflow-hidden h-[160px] shadow-card-warm hover-scale cursor-pointer transition-transform duration-300 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Rich gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {/* Gold border accent at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-temple-gold/60 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-base font-display font-semibold text-primary-foreground">
                  {t.name}
                </p>
                <p className="text-xs font-body text-primary-foreground/70 mt-0.5">📍 {t.location}</p>
              </div>
              <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span className="text-xs font-body font-semibold text-foreground">{t.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTemples;
