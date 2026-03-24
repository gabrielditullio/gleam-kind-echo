import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";

const milestones = [
  { title: "HOJE", text: "Você se inscreve e recebe acesso à plataforma, à comunidade e a todos os módulos gravados. Liberado na hora." },
  { title: "PRIMEIRA SEMANA", text: "Você assiste os módulos de base — como o cavalo aprende, expressões faciais, estados emocionais. E já começa a olhar pro seu cavalo de outro jeito." },
  { title: "PRIMEIRO MÊS", text: "Você acompanha os cases em tempo real, participa do primeiro encontro ao vivo e traz suas dúvidas." },
  { title: "EM 12 MESES", text: "Você entende o seu cavalo melhor do que qualquer profissional que você já contratou. E nunca mais vai precisar depender de ninguém pra tomar uma decisão sobre ele." },
];

const SectionPassos = () => {
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
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 800 }}>
          <div className="text-center">
            <SectionLabel text="SEUS PRÓXIMOS PASSOS" dark />
          </div>
          <div
            className="flex justify-center mb-4 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="bg-sand-default rounded-[8px] px-8 py-4">
              <h2 className="font-headline font-bold text-[18px] md:text-[22px] text-plum-dark uppercase text-center">
                Seus Próximos Passos Dentro da Formação
              </h2>
            </div>
          </div>
          <HeadlineUnderline />
          <div style={{ marginBottom: 48 }} />

          <div className="relative">
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-sand-default left-[18px] md:left-1/2 md:-translate-x-px"
            />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="relative flex items-start md:items-center"
                  >
                    <div
                      className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-sand-default z-10 transition-all duration-500 ease-out"
                      style={{
                        border: "2px solid white",
                        top: "24px",
                        transitionDelay: `${300 + i * 200}ms`,
                        opacity: visible ? 1 : 0.3,
                        transform: visible
                          ? "scale(1) translateX(var(--tw-translate-x, 0))"
                          : "scale(0.5) translateX(var(--tw-translate-x, 0))",
                      }}
                    />

                    <div className={`w-full pl-10 md:pl-0 md:flex ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      <div className="md:w-1/2" />
                      <div
                        className={`md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}
                      >
                        <div
                          className="rounded-[8px] p-5 transition-all duration-300 ease-in-out hover:bg-[rgba(66,34,76,0.5)]"
                          style={{
                            background: "rgba(66,34,76,0.3)",
                            maxWidth: 340,
                            transitionDelay: `${300 + i * 200}ms`,
                            opacity: visible ? 1 : 0,
                            transform: visible
                              ? "translateX(0)"
                              : `translateX(${isLeft ? "-30px" : "30px"})`,
                          }}
                        >
                          <p className="font-body font-semibold text-[16px] text-sand-light mb-2">{m.title}</p>
                          <p className="font-body text-[15px] leading-[1.65]" style={{ color: "#CCC" }}>
                            {m.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPassos;
