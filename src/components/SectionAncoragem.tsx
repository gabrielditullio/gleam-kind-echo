import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";

const items = [
  { name: "Formação completa: 10 módulos temáticos", value: "R$ 2.997" },
  { name: "Cases reais documentados em tempo real", value: "R$ 1.497" },
  { name: "12 encontros ao vivo com Dra. Paolla", value: "R$ 2.400" },
  { name: "Comunidade exclusiva de alunos (12 meses)", value: "R$ 997" },
  { name: "E-book de Embocaduras e Bitless", value: "R$ 67" },
];

const SectionAncoragem = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-plum-dark py-section-mobile md:py-section-desktop">
      <div ref={ref} className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 700 }}>
        <SectionLabel text="SEU INVESTIMENTO" dark />

        <h2
          className="font-display font-bold text-[28px] md:text-[36px] text-neutral-50 leading-[1.2] mb-2 transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          Quanto Vale Tudo Isso?
        </h2>
        <HeadlineUnderline />

        {/* Value stack table */}
        <div
          className="mt-10 text-left transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-body text-xs uppercase tracking-[0.1em] text-neutral-400">Item</span>
            <span className="font-body text-xs uppercase tracking-[0.1em] text-neutral-400">Valor</span>
          </div>

          {/* Rows */}
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-white/[0.05] transition-all duration-500 ease-out"
              style={{
                transitionDelay: `${300 + i * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-10px)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-body text-sm text-sand/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-base text-neutral-50">{item.name}</span>
              </div>
              <span className="font-body text-base text-coral line-through flex-shrink-0 ml-4">
                {item.value}
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            className="flex items-center justify-between mt-4 pt-4 border-t border-sand/30 transition-all duration-500 ease-out"
            style={{ transitionDelay: "800ms", opacity: visible ? 1 : 0 }}
          >
            <span className="font-body font-semibold text-base text-sand">Total percebido</span>
            <div className="text-right">
              <span className="font-display font-bold text-xl text-sand line-through">R$ 7.958</span>
              <p className="font-body font-semibold text-xs uppercase tracking-[0.1em] text-coral mt-1">
                Tudo incluso na formação
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAncoragem;
