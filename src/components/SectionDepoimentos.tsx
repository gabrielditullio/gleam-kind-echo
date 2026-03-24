import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";

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
        style={{ background: "linear-gradient(to bottom, hsl(var(--plum-dark)), hsl(var(--neutral-50)))" }}
      />

      <div className="bg-neutral-50 py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1080 }}>
          <div className="text-center mb-10">
            <SectionLabel text="RESULTADOS REAIS" />
            <h2
              className="font-headline font-bold text-[28px] md:text-[36px] text-plum-dark transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
            >
              600+ cavalos. E contando.
            </h2>
            <HeadlineUnderline />
            <p
              className="font-body text-[17px] text-neutral-600 mt-4 transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transitionDelay: "150ms" }}
            >
              Quem já aplicou, comprova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative bg-white rounded-[12px] p-6 pt-10 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                style={{
                  border: "1px solid hsl(var(--neutral-200))",
                  boxShadow: "0 2px 8px rgba(42,21,48,0.06)",
                  transitionDelay: `${300 + i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(42,21,48,0.12)"; e.currentTarget.style.borderColor = "rgba(196,168,130,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(42,21,48,0.06)"; e.currentTarget.style.borderColor = "hsl(var(--neutral-200))"; }}
              >
                {/* Decorative quote */}
                <span
                  className="absolute font-headline text-[48px] text-sand-default leading-none select-none"
                  style={{ top: 12, left: 16, opacity: 0.6 }}
                >
                  "
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-body font-semibold text-[14px] text-plum-light">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[16px] text-plum-dark">{t.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={12} className="text-sand-default fill-sand-default" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-body text-[15px] text-neutral-600 leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center">
            <a href="#prova" className="font-body font-medium text-[14px] text-sand-default underline hover:brightness-90 transition-all duration-150">
              Casos reais de participantes do Workshop
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionDepoimentos;
