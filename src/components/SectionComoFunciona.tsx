import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";

const steps = [
  {
    title: "Módulos Gravados",
    text: "Toda a base teórica e técnica da Doma Comportamental. Como o cavalo aprende. Como ler expressões faciais e corporais. Reforço, punição, autorregulação. Do zero ao avançado.",
    italic: "É como ter o mapa completo na mão antes de sair dirigindo.",
  },
  {
    title: "Cases Reais em Tempo Real",
    text: "Você não assiste uma doma editada de estúdio. Você acompanha o processo real de doma de cavalos reais — publicado no dia em que acontece. Com todos os erros, ajustes e evoluções.",
    italic: "É como estar do meu lado no rancho.",
  },
  {
    title: "Encontros Ao Vivo Mensais",
    text: "Uma vez por mês, a gente se encontra ao vivo. Você traz o caso do seu cavalo, eu analiso e te dou direção. Não é live genérica. É análise técnica do SEU caso.",
    italic: "",
  },
  {
    title: "Comunidade de Alunos",
    text: "Grupo no WhatsApp com alunos que estão no mesmo caminho. Dúvidas do dia a dia, situações de emergência, troca real. Eu participo ativamente. Você nunca fica sem resposta.",
    italic: "",
  },
];

const SectionComoFunciona = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section>
      <div className="bg-plum-dark py-section-mobile md:py-section-desktop relative">
        {/* Top halo */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/[0.03] to-transparent pointer-events-none" />
        {/* Bottom halo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand/[0.03] to-transparent pointer-events-none" />
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1200 }}>
          <div className="text-center">
            <SectionLabel text="O MÉTODO NA PRÁTICA" dark />
          </div>
          <div
            className="flex justify-center mb-4 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="bg-sand rounded-[8px] px-8 py-4">
              <h2 className="font-display font-bold text-[18px] md:text-[22px] text-plum-dark uppercase text-center">
                Como Funciona a Formação na Prática
              </h2>
            </div>
          </div>
          <HeadlineUnderline />
          <div style={{ marginBottom: 48 }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-cards mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-[12px] p-7 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                style={{
                  background: "rgba(66,34,76,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transitionDelay: `${200 + i * 150}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : "translateY(20px)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,168,130,0.5)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(42,21,48,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span className="inline-block font-body font-semibold text-[11px] px-3 py-1 rounded-full mb-4 bg-sand text-plum-dark">
                  Passo {i + 1}
                </span>
                <h3 className="font-body font-semibold text-[20px] text-neutral-50 mb-3">{step.title}</h3>
                <p className="font-body text-[15px] leading-[1.65]" style={{ color: "#DDD7D0" }}>
                  {step.text}
                </p>
                {step.italic && (
                  <p className="font-body italic text-[14px] mt-3 text-sand-light">{step.italic}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionComoFunciona;
