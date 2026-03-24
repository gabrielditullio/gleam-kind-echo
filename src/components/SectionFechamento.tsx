import { useEffect, useRef, useState } from "react";
import logoDoma from "@/assets/logo-doma.png";
import { useCheckout } from "@/contexts/CheckoutContext";
import CornerOrnaments from "./CornerOrnaments";

const SectionFechamento = () => {
  const { openCheckout } = useCheckout();
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
      <div className="bg-plum-dark py-20 md:py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/[0.03] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand/[0.03] to-transparent pointer-events-none" />
        <CornerOrnaments />
        <div ref={ref} className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 700 }}>
          <h2
            className="font-display font-bold text-[28px] md:text-[36px] text-neutral-50 leading-snug transition-all duration-[800ms] ease-out"
            style={{ clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          >
            Seu cavalo não precisa de mais um treinador.
          </h2>
          <h2
            className="font-display font-bold text-[28px] md:text-[36px] text-neutral-50 leading-snug mt-2 transition-all duration-[800ms] ease-out"
            style={{ clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", transitionDelay: "400ms" }}
          >
            Ele precisa de você sabendo o que faz.
          </h2>

          <p
            className="font-body text-[17px] leading-[1.65] mt-8 transition-all duration-500 ease-out"
            style={{ color: "rgba(255,255,255,0.85)", transitionDelay: "800ms", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Eu já trabalhei com mais de <strong className="text-neutral-50">600 cavalos</strong>. Eu criei a <strong className="text-neutral-50">única formação</strong> em doma comportamental do Brasil. E eu posso te dizer com convicção: quando você entende a ciência por trás do comportamento equino, tudo muda.
          </p>

          <p
            className="font-display font-semibold italic text-[22px] md:text-[28px] text-sand leading-relaxed mt-6 transition-all duration-500 ease-out"
            style={{ transitionDelay: "1000ms", opacity: visible ? 1 : 0 }}
          >
            Isso aqui não existe em nenhum outro lugar. Não existe plano B.
          </p>

          <p
            className="font-display italic text-xl text-neutral-50 mt-4 transition-all duration-500 ease-out text-center"
            style={{ transitionDelay: "1200ms", opacity: visible ? 1 : 0 }}
          >
            Agora é sua vez.
          </p>

          <div
            className="mt-8 transition-all duration-500 ease-out"
            style={{ transitionDelay: "1400ms", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.95)" }}
          >
            <button
              onClick={openCheckout}
              className="group relative inline-flex items-center justify-center gap-2 bg-coral text-white font-body font-semibold text-[17px] uppercase tracking-[0.05em] px-12 py-5 rounded-lg transition-all duration-150 hover:bg-coral-dark w-full md:w-auto overflow-hidden cursor-pointer"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Quero entrar na formação
                <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>

          <p className="font-body text-sm text-neutral-400 mt-3">
            ou 12x de R$ 154,82 · Acesso imediato · Pagamento seguro
          </p>

          <div className="mt-20 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <img src={logoDoma} alt="Formação em Doma Comportamental" className="mx-auto mb-4 w-[250px] md:w-[320px] h-auto" />
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
