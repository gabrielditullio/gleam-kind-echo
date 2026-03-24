import { useEffect, useRef, useState } from "react";

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
    <section className="bg-roxo-profundo py-section-mobile md:py-section-desktop">
      <div ref={ref} className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 680 }}>
        <div
          className="transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="font-headline font-bold text-[22px] md:text-[28px] text-white leading-[1.3] mb-6">
            Cada vez que você manda o cavalo pra doma sem saber o que estão fazendo com ele, são{" "}
            <span className="text-dourado-claro">R$3.000</span>, <span className="text-dourado-claro">R$5.000</span> de risco.
          </h2>

          <p className="font-headline font-bold text-[22px] md:text-[28px] text-white leading-[1.3] mb-6">
            Em 2 domas? São <span className="text-dourado-claro">R$10 mil</span> jogados na incerteza.
          </p>

          <p className="font-headline font-bold text-[22px] md:text-[28px] text-white leading-[1.3] mb-8">
            Um cavalo que volta com trauma? Meses de reabilitação. Milhares de reais. E um animal sofrendo.
          </p>

          <p
            className="font-body font-bold text-[20px] md:text-[24px] text-vermelho-terroso transition-all duration-500 ease-out"
            style={{ transitionDelay: "400ms", opacity: visible ? 1 : 0 }}
          >
            Você tem coragem de deixar isso continuar?
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAncoragem;
