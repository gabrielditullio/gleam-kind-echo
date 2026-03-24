import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowDown, RotateCcw } from "lucide-react";

const cycleSteps = [
  "Não entende o cavalo",
  "Depende de profissional",
  "Profissional não explica",
  "Cavalo volta com problema",
  "Gasta mais dinheiro",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedCounter({ target, visible }: { target: number; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <>{count}%</>;
}

const SectionProblema = () => {
  const headline = useInView(0.2);
  const cycle = useInView(0.15);
  const calma = useInView(0.3);
  const stats = useInView(0.3);

  const fade = useCallback((visible: boolean, delay: number) => ({
    className: `transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  }), []);

  return (
    <section className="bg-off-white py-section-mobile md:py-section-desktop">
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: 860 }}>
        <div
          className="bg-white rounded-2xl p-6 md:p-12"
          style={{ boxShadow: "0 4px 20px rgba(45,27,61,0.06)" }}
        >
          {/* Intro */}
          <div ref={headline.ref}>
            <p {...fade(headline.visible, 0)}>
              <span className="block text-center font-body text-[18px] text-texto-corpo mb-6">
                Antes de mais nada, entenda uma coisa:
              </span>
            </p>

            {/* Headline with clip-path reveal */}
            <h2
              className="text-center font-headline font-bold text-[28px] md:text-[40px] leading-tight text-vermelho-terroso mb-6 transition-all duration-[800ms] ease-out"
              style={{
                clipPath: headline.visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
              }}
            >
              O PROBLEMA NÃO É O SEU CAVALO.
            </h2>
          </div>

          {/* Emotional text block */}
          <div {...fade(headline.visible, 300)}>
            <div className="max-w-text mx-auto space-y-5 text-center font-body text-[18px] leading-[1.7] text-texto-corpo mb-8">
              <p>Você já tentou de tudo.</p>
              <p>
                Já levou pra domador. Já pagou{" "}
                <span className="font-bold text-vermelho-terroso">R$3.000</span>,{" "}
                <span className="font-bold text-vermelho-terroso">R$5.000</span> em treinamento.
                Já assistiu vídeo no YouTube. Já tentou replicar técnica de Instagram.
              </p>
              <p>Mas na hora de lidar com o cavalo de verdade… <span className="font-bold">você trava.</span></p>
              <p>
                Ele faz algo que você não entende. Você não sabe se é medo,
                se é dor, se é desconforto. E o medo de piorar a situação
                é maior que a vontade de tentar.
              </p>
              <p>Sabe o que acontece?</p>
            </div>
          </div>

          {/* Cycle diagram */}
          <div ref={cycle.ref} className="max-w-[720px] mx-auto mb-8" style={{ marginTop: 32 }}>
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
              {cycleSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="bg-roxo-medio text-white font-body text-[13px] font-medium px-4 py-3 rounded-lg text-center min-w-[120px] transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      opacity: cycle.visible ? 1 : 0,
                      transform: cycle.visible ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    {step}
                  </div>
                  {i < cycleSteps.length - 1 && (
                    <ArrowRight size={20} className="text-dourado-claro flex-shrink-0" />
                  )}
                </div>
              ))}
              <div
                className="ml-2 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${cycleSteps.length * 120}ms`, opacity: cycle.visible ? 1 : 0 }}
              >
                <RotateCcw size={22} className="text-vermelho-terroso" />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden flex-col items-center gap-3">
              {cycleSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div
                    className="bg-roxo-medio text-white font-body text-[13px] font-medium px-5 py-3 rounded-lg text-center w-full max-w-[220px] transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      opacity: cycle.visible ? 1 : 0,
                      transform: cycle.visible ? "translateY(0)" : "translateY(-15px)",
                    }}
                  >
                    {step}
                  </div>
                  {i < cycleSteps.length - 1 && (
                    <ArrowDown size={20} className="text-dourado-claro" />
                  )}
                </div>
              ))}
              <div
                className="mt-1 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${cycleSteps.length * 120}ms`, opacity: cycle.visible ? 1 : 0 }}
              >
                <RotateCcw size={22} className="text-vermelho-terroso" />
              </div>
            </div>
          </div>

          {/* Self-sabotage phrases */}
          <div {...fade(cycle.visible, 800)} style={{ ...fade(cycle.visible, 800).style, marginTop: 32 }}>
            <div className="text-center space-y-2 mb-8">
              <p className="font-body text-[18px] text-texto-corpo mb-3">Você já se convenceu:</p>
              {[
                "\u201CEu não sirvo pra isso.\u201D",
                "\u201CCavalo é coisa de profissional.\u201D",
                "\u201CEu vou só pagar alguém e torcer.\u201D",
              ].map((phrase) => (
                <p key={phrase} className="font-body italic text-[18px] text-vermelho-terroso">
                  {phrase}
                </p>
              ))}
            </div>
          </div>

          {/* CALMA */}
          <div ref={calma.ref} style={{ marginTop: 32 }}>
            <h2
              className="text-center font-headline font-bold text-[40px] md:text-[56px] text-dourado mb-4 transition-all duration-[800ms] ease-out"
              style={{
                opacity: calma.visible ? 1 : 0,
                transform: calma.visible ? "scale(1)" : "scale(0.8)",
                textShadow: calma.visible ? "0 0 40px rgba(201,168,76,0.3)" : "none",
              }}
            >
              CALMA.
            </h2>

            <p
              className="text-center font-body font-bold text-[20px] text-roxo-profundo transition-all duration-500 ease-out"
              style={{
                transitionDelay: "300ms",
                opacity: calma.visible ? 1 : 0,
                transform: calma.visible ? "translateY(0)" : "translateY(10px)",
              }}
            >
              O problema não é você. É que ninguém te ensinou a LER o cavalo.
            </p>
          </div>

          {/* Stats */}
          <div ref={stats.ref} style={{ marginTop: 24 }}>
            <p
              className="font-body text-[17px] text-texto-corpo text-center max-w-text mx-auto leading-relaxed transition-all duration-500 ease-out"
              style={{ opacity: stats.visible ? 1 : 0, transform: stats.visible ? "translateY(0)" : "translateY(20px)" }}
            >
              <span className="font-bold text-roxo-claro"><AnimatedCounter target={77} visible={stats.visible} /></span>{" "}
              das pessoas que pesquisei têm medo de violência e trauma na doma.{" "}
              <span className="font-bold text-roxo-claro"><AnimatedCounter target={64} visible={stats.visible} /></span>{" "}
              são iniciantes totais.{" "}
              <span className="font-bold text-roxo-claro"><AnimatedCounter target={43} visible={stats.visible} /></span>{" "}
              dependem completamente de terceiros.
            </p>
          </div>

          {/* Personal block */}
          <div {...fade(stats.visible, 400)} style={{ ...fade(stats.visible, 400).style, marginTop: 24 }}>
            <div className="max-w-text mx-auto space-y-5 text-center font-body text-[18px] leading-[1.7] text-texto-corpo">
              <p>
                Eu já estive exatamente onde você está. Eu já vi minha própria
                égua virar de costas pra mim — uma égua que eu vi nascer.
              </p>
              <p>
                Não porque eu era violenta. Mas porque eu estava replicando
                métodos que, pra ela, eram agressivos. Sem saber.
              </p>
              <p>
                Eu sou a <span className="font-bold">única profissional</span> no Brasil que criou um método de doma
                inteiramente baseado em ciência do comportamento equino.
              </p>
              <p>
                Não é doma racional com outro nome. Não é horsemanship com
                marketing bonito. É algo que não existia antes.
              </p>
              <p>
                Depois de mais de <span className="font-bold">600 cavalos trabalhados</span> — incluindo casos que
                outros profissionais desistiram — eu posso te dizer com segurança:
                {" "}<span className="font-bold">esse método funciona</span>.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div {...fade(stats.visible, 800)} style={{ ...fade(stats.visible, 800).style, marginTop: 16 }}>
            <p className="text-center font-body font-bold text-[20px] text-roxo-profundo">
              E é exatamente isso que eu vou te ensinar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProblema;
