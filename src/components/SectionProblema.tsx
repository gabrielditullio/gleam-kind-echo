import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowDown, RotateCcw } from "lucide-react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";


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
    <>
      <section className="bg-neutral-50 py-section-mobile md:py-section-desktop">
        <div className="mx-auto px-5 md:px-10" style={{ maxWidth: 860 }}>
          <div
            className="bg-white rounded-[12px] p-6 md:p-12 transition-all duration-300 ease-in-out hover:shadow-[0_4px_16px_rgba(42,21,48,0.12)]"
            style={{ boxShadow: "0 2px 8px rgba(42,21,48,0.06)", border: "1px solid #DDD7D0", transition: "all 300ms ease-in-out" }}
          >
            <div ref={headline.ref} className="text-center">
              <SectionLabel text="ANTES DE MAIS NADA" />
              <p {...fade(headline.visible, 0)}>
                <span className="block text-center font-body text-[17px] text-neutral-800 mb-6">
                  Antes de mais nada, entenda uma coisa:
                </span>
              </p>

              <h2
                className="text-center font-display font-bold text-[28px] md:text-[40px] leading-tight text-coral-dark mb-2 transition-all duration-[800ms] ease-out"
                style={{
                  clipPath: headline.visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                }}
              >
                O PROBLEMA NÃO É O SEU CAVALO.
              </h2>
              <HeadlineUnderline />
            </div>

            <div {...fade(headline.visible, 300)} style={{ ...fade(headline.visible, 300).style, marginTop: 24 }}>
              <div className="max-w-text mx-auto space-y-5 text-center font-body text-[17px] leading-[1.65] text-neutral-800 mb-8">
                <p>Você já tentou de tudo.</p>
                <p>
                  Já levou pra domador. Já pagou{" "}
                  <span className="font-semibold text-coral-dark">R$3.000</span>,{" "}
                  <span className="font-semibold text-coral-dark">R$5.000</span> em treinamento.
                  Já assistiu vídeo no YouTube. Já tentou replicar técnica de Instagram.
                </p>
                <p>Mas na hora de lidar com o cavalo de verdade… <span className="font-semibold">você trava.</span></p>
                <p>
                  Ele faz algo que você não entende. Você não sabe se é medo,
                  se é dor, se é desconforto. E o medo de piorar a situação
                  é maior que a vontade de tentar.
                </p>
                <p>Sabe o que acontece?</p>
              </div>
            </div>

            <div ref={cycle.ref} className="max-w-[720px] mx-auto mb-8" style={{ marginTop: 32 }}>
              <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
                {cycleSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="bg-plum text-white font-body text-[13px] font-medium px-4 py-3 rounded-[8px] text-center min-w-[120px] transition-all duration-500 ease-out"
                      style={{
                        transitionDelay: `${i * 120}ms`,
                        opacity: cycle.visible ? 1 : 0,
                        transform: cycle.visible ? "translateX(0)" : "translateX(-20px)",
                      }}
                    >
                      {step}
                    </div>
                    {i < cycleSteps.length - 1 && (
                      <ArrowRight size={20} className="text-sand-light flex-shrink-0" />
                    )}
                  </div>
                ))}
                <div
                  className="ml-2 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${cycleSteps.length * 120}ms`, opacity: cycle.visible ? 1 : 0 }}
                >
                  <RotateCcw size={22} className="text-coral-dark" />
                </div>
              </div>

              <div className="flex md:hidden flex-col items-center gap-3">
                {cycleSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div
                      className="bg-plum text-white font-body text-[13px] font-medium px-5 py-3 rounded-[8px] text-center w-full max-w-[220px] transition-all duration-500 ease-out"
                      style={{
                        transitionDelay: `${i * 120}ms`,
                        opacity: cycle.visible ? 1 : 0,
                        transform: cycle.visible ? "translateY(0)" : "translateY(-15px)",
                      }}
                    >
                      {step}
                    </div>
                    {i < cycleSteps.length - 1 && (
                      <ArrowDown size={20} className="text-sand-light" />
                    )}
                  </div>
                ))}
                <div
                  className="mt-1 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${cycleSteps.length * 120}ms`, opacity: cycle.visible ? 1 : 0 }}
                >
                  <RotateCcw size={22} className="text-coral-dark" />
                </div>
              </div>
            </div>

            <div {...fade(cycle.visible, 800)} style={{ ...fade(cycle.visible, 800).style, marginTop: 32 }}>
              <div className="text-center space-y-2 mb-8">
                <p className="font-body text-[17px] text-neutral-800 mb-3">Você já se convenceu:</p>
                {[
                  "\u201CEu não sirvo pra isso.\u201D",
                  "\u201CCavalo é coisa de profissional.\u201D",
                  "\u201CEu vou só pagar alguém e torcer.\u201D",
                ].map((phrase) => (
                  <p key={phrase} className="font-body italic text-[17px] text-coral-dark">
                    {phrase}
                  </p>
                ))}
              </div>
            </div>

            <div ref={calma.ref} style={{ marginTop: 32 }}>
              <h2
                className="text-center font-display font-bold text-[40px] md:text-[56px] text-sand mb-4 transition-all duration-[800ms] ease-out"
                style={{
                  opacity: calma.visible ? 1 : 0,
                  transform: calma.visible ? "scale(1)" : "scale(0.8)",
                  textShadow: calma.visible ? "0 0 40px rgba(196,168,130,0.3)" : "none",
                }}
              >
                CALMA.
              </h2>

              <p
                className="text-center font-body font-semibold text-[20px] text-plum-dark transition-all duration-500 ease-out"
                style={{
                  transitionDelay: "300ms",
                  opacity: calma.visible ? 1 : 0,
                  transform: calma.visible ? "translateY(0)" : "translateY(10px)",
                }}
              >
                O problema não é você. É que ninguém te ensinou a LER o cavalo.
              </p>
            </div>

            <div ref={stats.ref} style={{ marginTop: 32 }}>
              <div
                className="grid grid-cols-3 gap-6 max-w-lg mx-auto transition-all duration-500 ease-out"
                style={{ opacity: stats.visible ? 1 : 0, transform: stats.visible ? "translateY(0)" : "translateY(20px)" }}
              >
                {[
                  { value: 77, label: "Têm medo de violência na doma" },
                  { value: 64, label: "São iniciantes totais" },
                  { value: 43, label: "Dependem de terceiros" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center transition-all duration-500 ease-out"
                    style={{ transitionDelay: `${i * 150}ms`, opacity: stats.visible ? 1 : 0, transform: stats.visible ? "translateY(0)" : "translateY(10px)" }}
                  >
                    <span className="font-display text-4xl md:text-5xl font-bold text-plum block">
                      <AnimatedCounter target={stat.value} visible={stats.visible} />
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.1em] text-neutral-400 mt-2 block">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div {...fade(stats.visible, 400)} style={{ ...fade(stats.visible, 400).style, marginTop: 24 }}>
              <div className="max-w-text mx-auto space-y-5 text-center font-body text-[17px] leading-[1.65] text-neutral-800">
                <p>
                  Eu já estive exatamente onde você está. Eu já vi minha própria
                  égua virar de costas pra mim — uma égua que eu vi nascer.
                </p>
                <p>
                  Não porque eu era violenta. Mas porque eu estava replicando
                  métodos que, pra ela, eram agressivos. Sem saber.
                </p>
                <p>
                  Eu sou a <span className="font-semibold">única profissional</span> no Brasil que criou um método de doma
                  inteiramente baseado em ciência do comportamento equino.
                </p>
                <p>
                  Não é doma racional com outro nome. Não é horsemanship com
                  marketing bonito. É algo que não existia antes.
                </p>
                <p>
                  Depois de mais de <span className="font-semibold">600 cavalos trabalhados</span> — incluindo casos que
                  outros profissionais desistiram — eu posso te dizer com segurança:
                  {" "}<span className="font-semibold">esse método funciona</span>.
                </p>
              </div>
            </div>

            <div {...fade(stats.visible, 800)} style={{ ...fade(stats.visible, 800).style, marginTop: 16 }}>
              <p className="text-center font-body font-semibold text-[20px] text-plum-dark">
                E é exatamente isso que eu vou te ensinar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionProblema;
