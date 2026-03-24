import { useEffect, useRef, useState } from "react";

const SectionFechamento = () => {
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
    <section>
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--off-white)), hsl(var(--roxo-profundo)))" }}
      />
      <div className="bg-roxo-profundo py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 700 }}>
          <h2
            className="font-headline font-bold text-[28px] md:text-[36px] text-white leading-snug transition-all duration-[800ms] ease-out"
            style={{ clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          >
            Seu cavalo não precisa de mais um treinador.
          </h2>
          <h2
            className="font-headline font-bold text-[28px] md:text-[36px] text-white leading-snug mt-2 transition-all duration-[800ms] ease-out"
            style={{ clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", transitionDelay: "400ms" }}
          >
            Ele precisa de você sabendo o que faz.
          </h2>

          <p
            className="font-body text-[18px] leading-[1.7] mt-8 transition-all duration-500 ease-out"
            style={{ color: "rgba(255,255,255,0.85)", transitionDelay: "800ms", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Eu já trabalhei com mais de <strong className="text-white">600 cavalos</strong>. Eu criei a <strong className="text-white">única formação</strong> em doma comportamental do Brasil. E eu posso te dizer com convicção: quando você entende a ciência por trás do comportamento equino, tudo muda.
          </p>

          <p
            className="font-body font-bold text-[22px] text-dourado-claro mt-6 transition-all duration-500 ease-out"
            style={{ transitionDelay: "1000ms", opacity: visible ? 1 : 0 }}
          >
            Isso aqui não existe em nenhum outro lugar. Não existe plano B.
          </p>

          <p
            className="font-body font-bold text-[20px] text-white mt-4 transition-all duration-500 ease-out"
            style={{ transitionDelay: "1200ms", opacity: visible ? 1 : 0 }}
          >
            Agora é sua vez.
          </p>

          <div
            className="mt-8 transition-all duration-500 ease-out"
            style={{ transitionDelay: "1400ms", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.95)" }}
          >
            <a
              href="#cta"
              className="group relative inline-flex items-center justify-center gap-2 bg-dourado text-white font-body font-bold text-[20px] uppercase px-12 py-5 rounded-[10px] transition-all duration-150 hover:brightness-90 w-full md:w-auto overflow-hidden"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Garantir minha vaga por R$ 997
                <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>

          <p className="font-body text-[14px] text-texto-cinza mt-4">
            Oferta válida somente nas primeiras 24 horas.
          </p>

          {/* Footer */}
          <div className="mt-20 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <img src={logoDoma} alt="Formação em Doma Comportamental" className="mx-auto mb-4 w-[140px] h-auto" />
            <p className="font-body text-[14px]" style={{ color: "rgba(255,255,255,0.6)" }}>
              Formação em Doma Comportamental · Dra. Paolla
            </p>
            <p className="font-body text-[12px] mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2026 · Todos os direitos reservados
            </p>
            <p className="font-body text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              <a href="#privacidade" className="underline hover:text-white/60 transition-colors">Política de Privacidade</a>
              {" · "}
              <a href="#termos" className="underline hover:text-white/60 transition-colors">Termos de Uso</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFechamento;
