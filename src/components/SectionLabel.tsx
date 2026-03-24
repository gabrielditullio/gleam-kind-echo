interface SectionLabelProps {
  text: string;
  dark?: boolean;
}

const SectionLabel = ({ text, dark = false }: SectionLabelProps) => (
  <p
    className={`font-body font-semibold text-xs uppercase tracking-[0.1em] mb-4 text-center ${
      dark ? "text-sand" : "text-plum"
    }`}
  >
    <span className="mr-1.5">✦</span>
    {text}
  </p>
);

export default SectionLabel;
