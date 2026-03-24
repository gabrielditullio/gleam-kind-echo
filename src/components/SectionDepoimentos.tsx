import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Participante 1",
    text: <>Apliquei ontem e minha égua já respondeu diferente. Pela primeira vez, <strong>entendi o que ela estava tentando me dizer</strong>.</>,
  },
  {
    name: "Participante 2",
    text: <>Pela primeira vez <strong>entendi por que ele morde</strong>. Não era agressividade — era medo. Mudou tudo.</>,
  },
  {
    name: "Participante 3",
    text: <>Assisti o primeiro vídeo e <strong>mudei tudo que eu fazia</strong>. Meu cavalo está outro animal.</>,
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
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--roxo-profundo)), hsl(var(--off-white)))" }}
      />

      <div className="bg-off-white py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1080 }}>
          {/* Headline */}
          <div className="text-center mb-10">
            <h2
              className="font-headline font-bold text-[28px] md:text-[36px] text-roxo-profundo transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
            >
              600+ cavalos. E contando.
            </h2>
            <p
              className="font-body text-[18px] text-texto-secundario mt-2 transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transitionDelay: "150ms" }}
            >
              Quem já aplicou, comprova.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 transition-all duration-500 ease-out"
                style={{
                  border: "1px solid hsl(var(--creme-roxo))",
                  transitionDelay: `${300 + i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-creme-roxo flex items-center justify-center flex-shrink-0">
                    <span className="font-body font-bold text-[14px] text-roxo-claro">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-bold text-[16px] text-roxo-profundo">{t.name}</p>
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

          <p className="text-center">
            <a href="#prova" className="font-body font-medium text-[14px] text-dourado underline hover:brightness-90 transition-all duration-150">
              Casos reais de participantes do Workshop
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionDepoimentos;
