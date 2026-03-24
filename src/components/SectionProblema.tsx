import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const cycleSteps = [
  "Não entende o cavalo",
  "Depende de profissional",
  "Profissional não explica",
  "Cavalo volta com problema",
  "Gasta mais dinheiro",
];

const SectionProblema = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number) =>
    `transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  return (
    <section className="bg-bege-claro py-section-mobile md:py-section-desktop">
      <div ref={sectionRef} className="mx-auto px-5 md:px-10" style={{ maxWidth: "860px" }}>
        <div className="bg-off-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] p-8 md:p-12">

          {/* Intro */}
          <p
            className={`text-center font-body text-body-mobile md:text-body text-texto-secundario mb-4 ${fade(0)}`}
            style={{ transitionDelay: "0ms" }}
          >
            Antes de mais nada, entenda uma coisa:
          </p>

          {/* Headline */}
          <h2
            className={`text-center font-headline font-bold text-h1-mobile md:text-[40px] leading-tight text-vermelho-terroso mb-8 ${fade(200)}`}
            style={{ transitionDelay: "200ms" }}
          >
            O PROBLEMA NÃO É O SEU CAVALO.
          </h2>

          {/* Emotional text */}
          <div
            className={`max-w-text mx-auto space-y-5 text-center font-body text-body-mobile md:text-body text-texto-corpo mb-10 ${fade(400)}`}
            style={{ transitionDelay: "400ms" }}
          >
            <p>Você já tentou de tudo.</p>
            <p>
              Já levou pra domador. Já pagou{" "}
              <span className="font-bold text-terroso">R$3.000</span>,{" "}
              <span className="font-bold text-terroso">R$5.000</span> em treinamento.
              Já assistiu vídeo no YouTube. Já tentou replicar técnica de Instagram.
            </p>
            <p>Mas na hora de lidar com o cavalo de verdade… você trava.</p>
            <p>
              Ele faz algo que você não entende. Você não sabe se é medo,
              se é dor, se é desconforto. E o medo de piorar a situação
              é maior que a vontade de tentar.
            </p>
            <p>Sabe o que acontece?</p>
          </div>

          {/* Cycle diagram */}
          <div className={`max-w-[720px] mx-auto mb-10 ${fade(600)}`} style={{ transitionDelay: "600ms" }}>
            {/* Desktop: horizontal */}
            <div className="hidden md:flex items-center justify-center gap-2">
              {cycleSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="bg-fundo-escuro-2 text-white font-body text-[13px] font-medium px-4 py-3 rounded-lg text-center min-w-[130px] transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${700 + i * 120}ms`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    {step}
                  </div>
                  {i < cycleSteps.length - 1 && (
                    <ArrowRight size={16} className="text-bege-areia flex-shrink-0" />
                  )}
                </div>
              ))}
              <div
                className="ml-2 transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${700 + cycleSteps.length * 120}ms`,
                  opacity: visible ? 1 : 0,
                }}
              >
                <RotateCcw size={20} className="text-vermelho-terroso" />
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="flex md:hidden flex-col items-center gap-3">
              {cycleSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div
                    className="bg-fundo-escuro-2 text-white font-body text-[13px] font-medium px-5 py-3 rounded-lg text-center w-full max-w-[240px] transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${700 + i * 120}ms`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    {step}
                  </div>
                  {i < cycleSteps.length - 1 && (
                    <ArrowRight size={16} className="text-bege-areia rotate-90" />
                  )}
                </div>
              ))}
              <div
                className="mt-1 transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${700 + cycleSteps.length * 120}ms`,
                  opacity: visible ? 1 : 0,
                }}
              >
                <RotateCcw size={20} className="text-vermelho-terroso" />
              </div>
            </div>
          </div>

          {/* Self-sabotage phrases */}
          <div
            className={`text-center space-y-2 mb-8 ${fade(900)}`}
            style={{ transitionDelay: "900ms" }}
          >
            <p className="font-body text-body-mobile md:text-body text-texto-corpo mb-2">
              Você já se convenceu:
            </p>
            {[
              "\u201CEu não sirvo pra isso.\u201D",
              "\u201CCavalo é coisa de profissional.\u201D",
              "\u201CEu vou só pagar alguém e torcer.\u201D",
            ].map((phrase) => (
              <p key={phrase} className="font-body italic text-body-mobile md:text-body text-vermelho-terroso">
                {phrase}
              </p>
            ))}
          </div>

          {/* CALMA */}
          <h2
            className={`text-center font-headline font-bold text-[40px] md:text-[56px] text-dourado mt-8 mb-4 ${fade(1100)}`}
            style={{ transitionDelay: "1100ms" }}
          >
            CALMA.
          </h2>

          {/* Scientific text */}
          <div
            className={`max-w-text mx-auto space-y-5 text-center font-body text-body-mobile md:text-body text-texto-corpo ${fade(1200)}`}
            style={{ transitionDelay: "1200ms" }}
          >
            <p>
              O problema não é você. É que ninguém te ensinou a LER o cavalo.
            </p>
            <p>
              <span className="font-bold text-terroso">77%</span> das pessoas que pesquisei têm medo de violência e trauma
              na doma. <span className="font-bold text-terroso">64%</span> são iniciantes totais.{" "}
              <span className="font-bold text-terroso">43%</span> dependem completamente de terceiros.
            </p>
            <p>
              Eu já estive exatamente onde você está. Eu já vi minha própria
              égua virar de costas pra mim — uma égua que eu vi nascer.
            </p>
            <p>
              Não porque eu era violenta. Mas porque eu estava replicando
              métodos que, pra ela, eram agressivos. Sem saber.
            </p>
            <p>
              O que me salvou não foi experiência. Foi entender a ciência.
            </p>
          </div>

          {/* Closing */}
          <p
            className={`text-center font-body font-bold text-[18px] md:text-[20px] text-marrom-escuro mt-8 ${fade(1400)}`}
            style={{ transitionDelay: "1400ms" }}
          >
            E é exatamente isso que eu vou te ensinar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionProblema;
