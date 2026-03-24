const SectionDivider = ({ light = false }: { light?: boolean }) => (
  <div className="flex items-center justify-center gap-3 py-12">
    <div className={`h-px w-16 ${light ? 'bg-neutral-300/40' : 'bg-sand-dark/25'}`} />
    <span className={`text-[10px] ${light ? 'text-neutral-300/50' : 'text-sand-dark/35'}`}>◆</span>
    <span className={`text-[7px] ${light ? 'text-neutral-300/40' : 'text-sand-dark/25'}`}>◇</span>
    <span className={`text-[10px] ${light ? 'text-neutral-300/50' : 'text-sand-dark/35'}`}>◆</span>
    <div className={`h-px w-16 ${light ? 'bg-neutral-300/40' : 'bg-sand-dark/25'}`} />
  </div>
);

export default SectionDivider;
