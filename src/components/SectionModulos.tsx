import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const modulos = [
  { title: "Aproximação e Cabresteamento", text: "Primeiros contatos, construção de confiança, trabalho de angulação. O fundamento de tudo que vem depois." },
  { title: "Primeiros Comandos (Redondel e Guia)", text: "Aceleração, redução, parada, troca de lado. Como ensinar sem confundir. Como ler o estado emocional durante o processo." },
  { title: "Autorregulação e Controle Emocional", text: "O treinamento que ensina o cavalo a se acalmar sozinho. A técnica que veio do esporte de alto rendimento adaptada pro comportamento equino." },
  { title: "Exercícios Fundamentais", text: "Desengajamento, flexionamento lateral, saída de pressão. A base que evita 90% dos problemas futuros." },
  { title: "Dessensibilização", text: "Apresentação de materiais, primeiro banho, área externa. Em 4 etapas — respeitando o ritmo do cavalo, não o seu." },
  { title: "Iniciação Bitless", text: "Introdução ao trabalho sem embocadura. A lógica científica por trás dessa escolha e como aplicar na prática." },
  { title: "Ensinando as 4 Patas", text: "Manejo dos cascos com segurança e cooperação. Sem luta. Sem 'empurrar a paleta.'" },
  { title: "Apresentação de Sela e Barrigueira", text: "O processo fragmentado, dia a dia, do manto à barrigueira apertada." },
  { title: "Transporte e Reboque", text: "Apresentação sem estresse. Um processo, não um trauma." },
  { title: "Avançado e Futuros", text: "Embocaduras, alinhamento, charreteamento, transição de comandos de solo pra montado. Em expansão contínua." },
];

const SectionModulos = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

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
      <div
        className="h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--plum-dark)), hsl(var(--neutral-50)))" }}
      />

      <div className="bg-neutral-50 py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 860 }}>
          <div className="text-center mb-12">
            <h2
              className="font-headline font-bold text-[22px] md:text-[28px] text-plum-dark mx-auto leading-snug transition-all duration-500 ease-out"
              style={{ maxWidth: 680, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
            >
              Eu preparei cada módulo pensando no que EU gostaria de ter aprendido quando comecei.
            </h2>
            <p
              className="font-body font-medium text-[17px] text-neutral-600 mt-2 transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transitionDelay: "150ms" }}
            >
              Do primeiro contato ao avançado.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {modulos.map((mod, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[12px] overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    border: isOpen ? "1px solid hsl(var(--plum-light))" : "1px solid hsl(var(--neutral-200))",
                    boxShadow: "0 2px 8px rgba(42,21,48,0.06)",
                    transitionDelay: `${200 + i * 60}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(15px)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-3 px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-body font-semibold text-[14px] text-sand-default flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body font-semibold text-[18px] text-plum-dark flex-1">
                      {mod.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-plum-light flex-shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-6 pb-5 font-body text-[15px] text-neutral-600 leading-[1.65]" style={{ paddingLeft: "calc(24px + 14px + 12px)" }}>
                      {mod.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionModulos;
