import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";

const items = [
  { name: "Formação completa: 10 módulos temáticos", value: "R$ 997", strike: true },
  { name: "Cases reais em tempo real", value: "R$ 497", strike: true },
  { name: "Encontros ao vivo mensais com a Dra. Paolla", value: "R$ 497", strike: true },
  { name: "E-book de Embocaduras e Bitless", value: "R$ 67", strike: true },
  { name: "Comunidade exclusiva de alunos", value: "Inestimável", strike: false },
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
          className="font-headline font-bold text-[28px] md:text-[36px] text-neutral-50 leading-[1.2] mb-2 transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          Quanto Vale Tudo Isso?
        </h2>
        <HeadlineUnderline />

        {/* Value table */}
        <div
          className="mt-10 text-left transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3" style={{ borderBottom: "1px solid rgba(221,215,208,0.2)" }}>
            <span className="font-body font-semibold text-[12px] uppercase tracking-[0.1em] text-neutral-400">Item</span>
            <span className="font-body font-semibold text-[12px] uppercase tracking-[0.1em] text-neutral-400">Valor</span>
          </div>

          {/* Rows */}
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 transition-all duration-500 ease-out"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                transitionDelay: `${300 + i * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-10px)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-body text-[14px] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="font-body text-[16px] text-neutral-50">{item.name}</span>
              </div>
              {item.strike ? (
                <span className="font-body text-[16px] text-coral-default line-through flex-shrink-0 ml-4">
                  {item.value}
                </span>
              ) : (
                <span className="font-body font-semibold text-[16px] text-sand-default flex-shrink-0 ml-4">
                  {item.value}
                </span>
              )}
            </div>
          ))}

          {/* Total */}
          <div
            className="flex items-center justify-between mt-6 pt-4 transition-all duration-500 ease-out"
            style={{
              borderTop: "1px solid rgba(221,215,208,0.2)",
              transitionDelay: "800ms",
              opacity: visible ? 1 : 0,
            }}
          >
            <span className="font-body font-semibold text-[16px] text-neutral-50">Total percebido</span>
            <span className="font-headline font-bold text-[24px] text-coral-default line-through">R$ 2.058</span>
          </div>
          <p
            className="text-center font-body font-semibold text-[12px] uppercase tracking-[0.1em] text-sand-default mt-3 transition-all duration-500 ease-out"
            style={{ transitionDelay: "900ms", opacity: visible ? 1 : 0 }}
          >
            Incluso na formação
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAncoragem;
