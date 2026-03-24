const SectionOrnament = () => (
  <div className="flex items-center justify-center py-6" style={{ width: 200, margin: "0 auto" }}>
    <div className="flex-1 h-px bg-sand opacity-40" />
    <div className="flex items-center gap-2 px-3">
      {[0, 1, 2].map((i) => (
        <svg key={i} width="6" height="6" viewBox="0 0 6 6" className="text-sand">
          <rect x="3" y="0" width="4.24" height="4.24" rx="0.5" transform="rotate(45 3 3)" fill="currentColor" />
        </svg>
      ))}
    </div>
    <div className="flex-1 h-px bg-sand opacity-40" />
  </div>
);

export default SectionOrnament;
