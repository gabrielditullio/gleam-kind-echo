import { useEffect, useRef, useState } from "react";

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
      {/* Transition gradient */}
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--off-white)), hsl(var(--roxo-profundo)))" }}
      />

      <div className="bg-roxo-profundo py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1200 }}>
          {/* Headline strip */}
          <div
            className="flex justify-center mb-12 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="bg-dourado rounded-lg px-8 py-4">
              <h2 className="font-headline font-bold text-[18px] md:text-[22px] text-roxo-profundo uppercase text-center">
                Como Funciona a Formação na Prática
              </h2>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-cards mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl p-7 transition-all duration-500 ease-out hover:-translate-y-1"
                style={{
                  background: "rgba(74,45,94,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transitionDelay: `${200 + i * 150}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : "translateY(20px)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <span className="inline-block font-body font-bold text-[11px] px-3 py-1 rounded-full mb-4 bg-dourado text-roxo-profundo">
                  Passo {i + 1}
                </span>
                <h3 className="font-body font-bold text-[20px] text-white mb-3">{step.title}</h3>
                <p className="font-body text-[15px] leading-[1.65]" style={{ color: "#CCC" }}>
                  {step.text}
                </p>
                {step.italic && (
                  <p className="font-body italic text-[14px] mt-3 text-dourado-claro">{step.italic}</p>
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
