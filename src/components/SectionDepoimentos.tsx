import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Participante do Workshop",
    text: "Apliquei ontem e minha égua já respondeu diferente. Pela primeira vez ela veio até mim sem corda, sem pressão. Chorei.",
    highlight: "já respondeu diferente",
  },
  {
    name: "Participante do Workshop",
    text: "Pela primeira vez entendi por que ele morde. Não é agressividade — é desconforto. Mudei o manejo e em 3 dias ele parou.",
    highlight: "entendi por que ele morde",
  },
  {
    name: "Participante do Workshop",
    text: "Assisti o primeiro vídeo e mudei tudo que eu fazia. Eu achava que estava sendo gentil, mas estava gerando ansiedade nele sem saber.",
    highlight: "mudei tudo que eu fazia",
  },
];

const SectionDepoimentos = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section>
      {/* Transition */}
      <div
        className="pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, hsl(var(--roxo-profundo)) 0%, hsl(var(--off-white)) 100%)" }}
      />

      <div className="bg-off-white py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1080 }}>
          {/* Headline */}
          <div className="text-center mb-12">
            <h2
              className="font-headline font-bold text-h2-mobile md:text-h2 text-roxo-profundo mb-2 transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
            >
              O meu método funciona.
            </h2>
            <p
              className="font-headline font-bold text-h3-mobile md:text-h3 text-roxo-claro transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transitionDelay: "200ms" }}
            >
              E quem já aplicou, prova.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 transition-all duration-500 ease-out"
                style={{
                  border: "1px solid hsl(var(--roxo-claro) / 0.15)",
                  transitionDelay: `${300 + i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-creme-roxo flex items-center justify-center">
                    <span className="font-body font-bold text-[14px] text-roxo-claro">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-[14px] text-roxo-profundo">{t.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={12} className="text-dourado fill-dourado" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-body text-[15px] text-texto-secundario leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>

          {/* Proof link */}
          <p className="text-center">
            <a href="#prova" className="font-body font-medium text-[14px] text-dourado underline hover:brightness-90 transition-all duration-150">
              Casos reais de participantes do Workshop de Doma Comportamental
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionDepoimentos;
