import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

const profiles = [
  "Tem cavalo e sente medo do que fazem com ele",
  "Quer se preparar antes de mandar pra doma",
  "Já pagou profissionais e continua dependente",
  "É estudante ou veterinário(a) querendo comportamento aplicado",
  "Quer criar vínculo baseado em confiança, não submissão",
  "Quer entender o cavalo de verdade e tomar decisões com segurança",
];

const SectionParaQuem = () => {
  const { openCheckout } = useCheckout();
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
        style={{ background: "linear-gradient(to bottom, hsl(var(--neutral-50)), hsl(var(--plum-dark)))" }}
      />

      <div className="bg-plum-dark py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 860 }}>
          <h2
            className="font-headline font-bold text-[24px] md:text-[32px] text-white text-center mb-8 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
          >
            Essa formação foi feita pra você que:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-auto" style={{ maxWidth: 800 }}>
            {profiles.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${200 + i * 80}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                <CheckCircle size={20} className="text-sage-default flex-shrink-0 mt-0.5" />
                <span className="font-body text-[16px] text-white">{p}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center" style={{ marginTop: 40 }}>
            <div className="w-full" style={{ maxWidth: 400, height: 1, background: "rgba(255,255,255,0.15)" }} />
          </div>

          <div
            className="text-center transition-all duration-500 ease-out"
            style={{
              marginTop: 40,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transitionDelay: "900ms",
            }}
          >
            <p className="font-body font-semibold text-[20px] text-white">
              NUNCA DOMOU UM CAVALO NA VIDA?{" "}
              <span className="text-sand-light">DEIXA COMIGO.</span>
            </p>
            <p className="font-body text-[16px] mx-auto mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: 600 }}>
              <span className="font-semibold text-sand-light">64%</span> dos meus alunos são iniciantes totais. A formação foi construída
              pra qualquer pessoa que ame cavalos — com método, com ciência
              e com linguagem acessível.
            </p>
          </div>

          <div
            className="flex justify-center transition-all duration-500 ease-out"
            style={{
              marginTop: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
              transitionDelay: "1100ms",
            }}
          >
            <button
              onClick={openCheckout}
              className="group relative inline-flex items-center justify-center gap-2 bg-coral-default text-white font-body font-semibold text-[15px] uppercase tracking-[0.05em] px-7 py-3.5 rounded-[8px] transition-all duration-150 hover:bg-coral-dark w-full md:w-auto overflow-hidden cursor-pointer"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                É pra mim! Quero entrar
                <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionParaQuem;
