import { useEffect, useRef, useState } from "react";

const badges = [
  "Não é curso tradicional",
  "Não é doma racional",
  "Não é achismo",
];

const SectionBadges = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Transition roxo-profundo → off-white */}
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--roxo-profundo)) 0%, hsl(var(--off-white)) 100%)" }}
      />

      <section ref={ref} className="bg-off-white py-section-mobile md:py-section-desktop">
        <div className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: "1000px" }}>
          {/* 3 badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 font-body font-bold text-[14px] text-white px-6 py-2.5 rounded-full bg-vermelho-terroso transition-all duration-[400ms] ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                ✕ {b}
              </span>
            ))}
          </div>

          {/* Highlight strip */}
          <div
            className="mx-auto mb-8 bg-dourado rounded-lg transition-all duration-500 ease-out"
            style={{
              maxWidth: "800px",
              padding: "16px 32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.97)",
              transitionDelay: "400ms",
            }}
          >
            <p className="font-headline font-bold text-[18px] md:text-[22px] uppercase tracking-[1px] text-roxo-profundo">
              É a única formação em doma baseada em ciência do comportamento
            </p>
          </div>

          {/* Paragraph */}
          <p
            className="font-body text-[17px] mx-auto leading-relaxed text-texto-corpo transition-all duration-500 ease-out"
            style={{
              maxWidth: "640px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transitionDelay: "600ms",
            }}
          >
            Você vai aprender a ler o seu cavalo. Entender o que cada expressão
            facial, cada contração muscular, cada reação significa. E vai aplicar
            isso no dia a dia — com método, com lógica, com acompanhamento.
          </p>
        </div>
      </section>
    </>
  );
};

export default SectionBadges;
