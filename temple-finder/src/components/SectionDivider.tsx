import DiyaLamp from "./DiyaLamp";

const SectionDivider = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-temple-gold/30" />
      <DiyaLamp size={24} />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-temple-gold/30" />
    </div>
  );
};

export default SectionDivider;
