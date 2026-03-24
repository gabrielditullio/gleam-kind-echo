import { useEffect, useRef, useState } from "react";
import { BookOpen, Percent, Tag, RefreshCw } from "lucide-react";
import SectionLabel from "./SectionLabel";
import HeadlineUnderline from "./HeadlineUnderline";


const bonuses = [
  {
    icon: BookOpen,
    title: "E-book de Embocaduras e Bitless",
    text: "O guia completo sobre as diferenças, prós e contras de cada tipo de embocadura — e por que eu escolhi montar sem.",
    value: "R$67",
  },
  {
    icon: Percent,
    title: "10% de desconto em produtos físicos",
    text: "Livro, Sidepull, ferramentas de manejo. Tudo que eu uso no dia a dia e que complementa a formação.",
  },
  {
    icon: Tag,
    title: "30% de desconto em produtos digitais",
    text: "Acesso aos meus outros materiais com desconto exclusivo pra alunos.",
  },
  {
    icon: RefreshCw,
    title: "Atualizações contínuas",
    text: "Novos módulos, novos cases, novos cavalos documentados. O conteúdo não para de crescer — e você tem acesso a tudo por 12 meses.",
  },
];

const SectionBonus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <>
      <SectionOrnament />
      <section className="bg-neutral-100 py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1080 }}>
          <div className="text-center">
            <SectionLabel text="BÔNUS" />
          </div>
          <h2
            className="font-display font-bold text-[24px] md:text-[32px] text-plum-dark text-center mb-2 transition-all duration-500 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
          >
            Espera. Eu vou deixar ainda mais fácil pra você.
          </h2>
          <HeadlineUnderline />
          <div style={{ marginBottom: 40 }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {bonuses.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[12px] p-6 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                  style={{
                    border: "1px solid #DDD7D0",
                    boxShadow: "0 2px 8px rgba(42,21,48,0.06)",
                    transitionDelay: `${200 + i * 100}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? undefined : "translateY(15px)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(42,21,48,0.12)"; e.currentTarget.style.borderColor = "rgba(196,168,130,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(42,21,48,0.06)"; e.currentTarget.style.borderColor = "#DDD7D0"; }}
                >
                  <Icon size={32} className="text-plum mb-4" />
                  <h3 className="font-body font-semibold text-[18px] text-plum-dark mb-2">{b.title}</h3>
                  <p className="font-body text-[15px] text-neutral-600 leading-relaxed">{b.text}</p>
                  {b.value && (
                    <p className="font-body text-[14px] mt-3">
                      <span className="text-neutral-400">Valor: </span>
                      <span className="line-through text-neutral-400">{b.value}</span>
                      {" "}
                      <span className="font-semibold text-sage">Incluído</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionBonus;
