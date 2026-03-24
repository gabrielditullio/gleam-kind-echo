import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Preciso ter experiência prévia com cavalos?", a: "Não. 64% do público são iniciantes totais. A linguagem é acessível e o passo a passo é real." },
  { q: "Funciona pra quem não vai domar pessoalmente?", a: "Sim. Entender comportamento te dá autonomia pra fiscalizar, identificar estresse e tomar decisões — mesmo que outra pessoa dome." },
  { q: "O que significa 'real time'?", a: "Os vídeos são publicados no dia em que o trabalho é feito com o cavalo. Sem edição de estúdio. Você vê os erros, ajustes e evoluções reais." },
  { q: "Como funciona o encontro ao vivo?", a: "Uma vez por mês, discussão de cases reais. Aplicações abrem 3 dias antes, data anunciada com 7 dias de antecedência. Você traz o caso do seu cavalo." },
  { q: "Por quanto tempo terei acesso?", a: "12 meses completos. Incluindo novos cases e módulos adicionados." },
  { q: "Sou veterinário(a). Faz sentido?", a: "Muito. Comportamento equino com base em neurociência aplicada — o tipo de conteúdo que deveria estar na graduação." },
  { q: "E se eu perceber que não é pra mim?", a: "Garantia incondicional de 7 dias. Sem pergunta. Sem burocracia." },
];

const SectionFaq = () => {
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
        style={{ background: "linear-gradient(to bottom, hsl(var(--off-white)), hsl(var(--burgundy)))" }}
      />
      <div className="bg-burgundy py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 800 }}>
          <h2
            className="font-headline font-bold text-[24px] md:text-[32px] text-white text-center mb-10 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
          >
            Dúvidas Frequentes
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-[10px] overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transitionDelay: `${i * 60}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(15px)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-body font-bold text-[16px] text-white">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className="text-white flex-shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="px-6 pb-5 font-body text-[15px] leading-[1.7]" style={{ color: "#CCC" }}>
                      {faq.a}
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

export default SectionFaq;
