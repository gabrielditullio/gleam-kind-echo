interface SectionLabelProps {
  text: string;
  dark?: boolean; // true = on dark bg, false = on light bg
}

const SectionLabel = ({ text, dark = false }: SectionLabelProps) => (
  <p
    className={`font-body font-semibold text-[12px] uppercase tracking-[0.1em] mb-3 ${
      dark ? "text-sand-default" : "text-plum-default"
    }`}
  >
    <span className="mr-1.5">◆</span>
    {text}
  </p>
);

export default SectionLabel;
