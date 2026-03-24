const SectionDivider = ({ light = false }: { light?: boolean }) => (
  <div className={`flex items-center justify-center gap-3 py-10 ${light ? 'text-neutral-200' : 'text-sand-dark/50'}`}>
    <div className="h-px w-16 bg-current" />
    <span className="text-[10px]">◆</span>
    <span className="text-[8px]">◇</span>
    <span className="text-[10px]">◆</span>
    <div className="h-px w-16 bg-current" />
  </div>
);

export default SectionDivider;
