import { useEffect, useRef, useState } from "react";
import bioPhoto from "@/assets/bio-paolla.jpg";

const SectionBio = () => {
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
    <section className="bg-off-white py-section-mobile md:py-section-desktop">
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: 900 }}>
        <div
          ref={ref}
          className="rounded-2xl p-6 md:p-12 transition-all duration-[600ms] ease-out"
          style={{
            border: "2px dashed hsl(var(--roxo-claro))",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Photo placeholder */}
            <div className="w-full md:w-[40%] flex-shrink-0">
              <div
                className="w-full flex items-center justify-center rounded-xl"
                style={{
                  aspectRatio: "3/4",
                  background: "rgba(74,45,94,0.1)",
                  border: "3px solid hsl(var(--dourado))",
                }}
              >
                <p className="font-body text-[14px] text-texto-cinza text-center px-6">
                  FOTO PAOLLA — close com cavalo
                </p>
              </div>
            </div>

            {/* Bio text */}
            <div className="w-full md:w-[60%]">
              <p
                className="font-body text-[14px] text-texto-cinza uppercase mb-2 transition-all duration-500 ease-out"
                style={{ letterSpacing: "1px", transitionDelay: "200ms", opacity: visible ? 1 : 0 }}
              >
                Quem vai te ensinar:
              </p>

              <h2
                className="font-headline font-bold text-[32px] text-roxo-profundo transition-all duration-500 ease-out"
                style={{ transitionDelay: "280ms", opacity: visible ? 1 : 0 }}
              >
                Dra. Paolla
              </h2>
              <div
                className="h-[3px] bg-dourado mt-2 mb-4 transition-all duration-500 ease-out"
                style={{ width: "60%", transitionDelay: "360ms", opacity: visible ? 1 : 0 }}
              />

              <span
                className="inline-block font-body font-bold text-[12px] text-roxo-profundo uppercase bg-dourado rounded-full px-5 py-1.5 mb-6 transition-all duration-500 ease-out"
                style={{ letterSpacing: "1px", transitionDelay: "440ms", opacity: visible ? 1 : 0 }}
              >
                Única especialista em doma comportamental do Brasil
              </span>

              <div
                className="space-y-4 font-body text-[16px] text-texto-corpo leading-[1.7] transition-all duration-500 ease-out"
                style={{ transitionDelay: "520ms", opacity: visible ? 1 : 0 }}
              >
                <p>
                  Eu sou a <strong>única</strong> especialista em doma comportamental do Brasil. E não é porque eu me dei esse título. É porque eu criei esse método do zero — depois de <strong>600+ cavalos</strong> trabalhados, anos de estudo científico e a certeza de que os métodos que existiam não funcionavam pra mim nem pros cavalos.
                </p>
                <p>
                  Sou médica veterinária, mestre em Produção Animal e especialista em Neurociência e Comportamento Humano.
                </p>
                <p>
                  Fui a <strong>primeira mulher</strong> a realizar uma turnê de cursos presenciais em mais de 20 estados brasileiros. Participei do reality show 'As Domadoras.' E, acima de tudo, eu criei o Método Comportamental porque os métodos que existiam não cabiam mais na minha ética.
                </p>
                <p>
                  Meus alunos vão desde iniciantes que nunca tocaram num cavalo até profissionais que trabalham há décadas e decidiram evoluir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBio;
