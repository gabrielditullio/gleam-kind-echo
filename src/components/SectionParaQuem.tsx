import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const profiles = [
  "Tem cavalo e sente medo do que fazem com ele",
  "Quer se preparar antes de mandar pra doma",
  "Já pagou profissionais e continua dependente",
  "É estudante ou veterinário(a) querendo comportamento aplicado",
  "Quer criar vínculo baseado em confiança, não submissão",
  "Quer entender o cavalo de verdade e tomar decisões com segurança",
];

const SectionParaQuem = () => {
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
      <div style={{ height: 200, background: "linear-gradient(to bottom, hsl(var(--branco)) 0%, hsl(var(--fundo-escuro-2)) 100%)" }} />

      <div className="bg-fundo-escuro-2 py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 860 }}>
          {/* Headline */}
          <h2
            className="font-headline font-bold text-h2-mobile md:text-[32px] text-white text-center mb-10 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
          >
            Essa formação foi feita pra você que:
          </h2>

          {/* Checks grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {profiles.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${200 + i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-15px)",
                }}
              >
                <CheckCircle size={20} className="text-verde-musgo flex-shrink-0 mt-0.5" />
                <span className="font-body text-[16px]" style={{ color: "#E0D8CF" }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="border-t mb-10" style={{ borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Beginner message */}
          <div
            className="text-center mb-10 transition-all duration-500 ease-out"
            style={{
              transitionDelay: "900ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
            }}
          >
            <p className="font-body font-bold text-[20px] text-dourado-claro mb-4">
              NUNCA DOMOU UM CAVALO NA VIDA? DEIXA COMIGO.
            </p>
            <p className="font-body text-[16px] max-w-text mx-auto" style={{ color: "#CCC" }}>
              64% dos meus alunos são iniciantes totais. A formação foi construída
              pra qualquer pessoa que ame cavalos — com método, com ciência
              e com linguagem acessível.
            </p>
          </div>

          {/* CTA */}
          <div
            className="flex justify-center transition-all duration-500 ease-out"
            style={{
              transitionDelay: "1100ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
            }}
          >
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 bg-dourado hover:brightness-90 text-white font-body font-bold text-[16px] uppercase px-10 py-4 transition-all duration-150 w-full md:w-auto"
              style={{ borderRadius: 10 }}
            >
              É pra mim! Quero entrar
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionParaQuem;
