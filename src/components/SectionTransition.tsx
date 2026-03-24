const SectionTransition = ({ from, to }: {
  from: 'dark' | 'light';
  to: 'dark' | 'light';
}) => {
  const isDarkToLight = from === 'dark' && to === 'light';

  return (
    <div className="relative w-full h-40 md:h-56 overflow-hidden pointer-events-none select-none">
      {/* Layer 1: Main gradient */}
      <div className={`absolute inset-0 ${
        isDarkToLight
          ? 'bg-gradient-to-b from-plum-dark via-plum-dark/80 to-neutral-50'
          : 'bg-gradient-to-b from-neutral-50 via-neutral-50/80 to-plum-dark'
      }`} />

      {/* Layer 2: Radial glow (warm light source) */}
      <div className={`absolute inset-0 ${
        isDarkToLight
          ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(196,168,130,0.08),transparent)]'
          : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(196,168,130,0.08),transparent)]'
      }`} />

      {/* Layer 3: Vignette (darkens edges) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_50%,transparent,rgba(42,21,48,0.15))]" />

      {/* Ornament centered in transition */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex items-center gap-3 text-sand-dark/40">
          <div className="h-px w-12 bg-current" />
          <span className="text-[10px]">◆</span>
          <span className="text-[8px]">◇</span>
          <span className="text-[10px]">◆</span>
          <div className="h-px w-12 bg-current" />
        </div>
      </div>

      {/* Soft glow line at junction */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-sand/20 to-transparent" />
    </div>
  );
};

export default SectionTransition;
