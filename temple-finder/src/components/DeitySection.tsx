import { useNavigate } from "react-router-dom";
import vishnuTilak from "@/assets/deities/vishnu-tilak.png";
import shivaTilak from "@/assets/deities/shiva-tilak.png";
import muruganVel from "@/assets/deities/murugan-vel.png";
import ammanKumkum from "@/assets/deities/amman-kumkum.png";

const deities = [
  { name: "Vishnu", image: vishnuTilak },
  { name: "Shiva", image: shivaTilak },
  { name: "Murugan", image: muruganVel },
  { name: "Amman", image: ammanKumkum },
];

const DeitySection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 relative overflow-hidden">
      <div className="px-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">
              Discover by Deity
            </h2>
            <p className="text-[11px] text-muted-foreground font-body mt-0.5">
              Seek blessings from your Ishta Devata
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="text-xs font-body text-saffron font-medium hover:underline"
          >
            View All →
          </button>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-2 px-3 scrollbar-hide">
        {deities.map((deity) => (
          <button
            type="button"
            key={deity.name}
            onClick={() => navigate(`/search?deity=${encodeURIComponent(deity.name)}`)}
            className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer"
          >
            <div className="w-[84px] h-[84px] rounded-full bg-[#F5ECD7] border border-[#C9A84C]/40 flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]">
              <img
                src={deity.image}
                alt={deity.name}
                className="w-[75%] h-[75%] object-contain"
              />
            </div>
            <p className="text-sm font-medium text-foreground text-center tracking-wide">
              {deity.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DeitySection;
