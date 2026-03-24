import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import SectionLabel from "./SectionLabel";


const badgesNegativos = [
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
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const anim = (delay: number, duration: number, type: string) => {
    const base = visible ? "opacity-100" : "opacity-0";
    const transform: Record<string, string> = {
      "fade-up": visible ? "translate-y-0" : "translate-y-2.5",
      "fade-scale": visible ? "scale-100" : "scale-[0.9]",
      "fade-scale-sm": visible ? "scale-100" : "scale-[0.97]",
      "fade": "",
    };
    return {
      className: `transition-all ease-out ${base} ${transform[type] || ""}`,
      style: { transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` } as React.CSSProperties,
    };
  };

  return (
    <>
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--plum-dark)), hsl(var(--neutral-50)))" }}
      />

      <section ref={ref} className="bg-neutral-50 py-section-mobile md:py-section-desktop">
        <div className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 800 }}>
          <SectionLabel text="O QUE NOS DIFERENCIA" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            {badgesNegativos.map((b, i) => (
              <span
                key={i}
                {...anim(i * 100, 400, "fade-up")}
                className={`${anim(i * 100, 400, "fade-up").className} inline-flex items-center gap-2 font-body font-semibold text-[14px] text-white px-6 py-2.5 rounded-full bg-coral-dark`}
              >
                <X size={14} className="flex-shrink-0" />
                {b}
              </span>
            ))}
          </div>

          <div {...anim(400, 400, "fade-scale")} className={`${anim(400, 400, "fade-scale").className} flex justify-center`} style={{ ...anim(400, 400, "fade-scale").style, marginTop: 12 }}>
            <span className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-plum px-6 py-2.5 rounded-full bg-sand">
              <Check size={14} className="flex-shrink-0" />
              600+ cavalos trabalhados com sucesso
            </span>
          </div>

          <div {...anim(700, 500, "fade-scale-sm")} className={`${anim(700, 500, "fade-scale-sm").className} mx-auto bg-sand rounded-[8px]`} style={{ ...anim(700, 500, "fade-scale-sm").style, maxWidth: 800, padding: "16px 32px", marginTop: 32 }}>
            <p className="font-headline font-bold text-[18px] md:text-[22px] uppercase text-plum-dark" style={{ letterSpacing: "1px" }}>
              A única formação em doma comportamental do Brasil baseada em ciência, não em achismo.
            </p>
          </div>

          <p {...anim(900, 500, "fade")} className={`${anim(900, 500, "fade").className} font-body text-[17px] text-neutral-800 mx-auto leading-relaxed`} style={{ ...anim(900, 500, "fade").style, maxWidth: 640, marginTop: 24 }}>
            Você vai aprender a ler o seu cavalo. Entender o que cada expressão facial, cada contração muscular, cada reação significa. E vai aplicar isso no dia a dia — com método, com lógica, com acompanhamento.
          </p>
        </div>
      </section>
    </>
  );
};

export default SectionBadges;
