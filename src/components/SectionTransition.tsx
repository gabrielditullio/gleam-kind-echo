interface SectionTransitionProps {
  from: 'dark' | 'light';
  to: 'dark' | 'light';
  showOrnament?: boolean;
}

const SectionTransition = ({ from, to, showOrnament = true }: SectionTransitionProps) => {
  const isDarkToLight = from === 'dark' && to === 'light';

  return (
    <div
      className="relative w-full h-48 md:h-64 overflow-hidden pointer-events-none select-none"
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      {/* Layer 1: Multi-stop gradient (7 stops for smooth blend) */}
      <div className={`absolute inset-0 ${
        isDarkToLight
          ? 'bg-[linear-gradient(to_bottom,#2A1530_0%,#2A1530_15%,rgba(66,34,76,0.85)_35%,rgba(107,58,120,0.15)_50%,rgba(240,236,232,0.85)_65%,#FAF8F6_85%,#FAF8F6_100%)]'
          : 'bg-[linear-gradient(to_bottom,#FAF8F6_0%,#FAF8F6_15%,rgba(240,236,232,0.85)_35%,rgba(107,58,120,0.15)_50%,rgba(66,34,76,0.85)_65%,#2A1530_85%,#2A1530_100%)]'
      }`} />

      {/* Layer 2: Radial glow — warm light at junction */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(196,168,130,0.10),transparent_70%)]" />

      {/* Layer 3: Horizontal light line at junction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-px bg-[linear-gradient(to_right,transparent,rgba(196,168,130,0.18),transparent)]" />

      {/* Layer 4: Edge vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_50%,transparent_40%,rgba(42,21,48,0.08))]" />

      {/* Ornament floating in the transition */}
      {showOrnament && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-sand-dark/30" />
            <span className="text-[10px] text-sand-dark/40">◆</span>
            <span className="text-[7px] text-sand-dark/30">◇</span>
            <span className="text-[10px] text-sand-dark/40">◆</span>
            <div className="h-px w-16 bg-sand-dark/30" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionTransition;
