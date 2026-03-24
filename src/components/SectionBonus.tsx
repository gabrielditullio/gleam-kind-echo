import { useEffect, useRef, useState } from "react";
import { BookOpen, Percent, Tag, RefreshCw } from "lucide-react";

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
    <section className="bg-creme-roxo py-section-mobile md:py-section-desktop">
      <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 1080 }}>
        <h2
          className="font-headline font-bold text-[24px] md:text-[32px] text-roxo-profundo text-center mb-10 transition-all duration-500 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
        >
          Espera. Eu vou deixar ainda mais fácil pra você.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {bonuses.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-6 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                style={{
                  border: "1px solid hsl(var(--creme-roxo))",
                  transitionDelay: `${200 + i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : "translateY(15px)",
                  boxShadow: undefined,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,27,61,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <Icon size={32} className="text-roxo-claro mb-4" />
                <h3 className="font-body font-bold text-[18px] text-roxo-profundo mb-2">{b.title}</h3>
                <p className="font-body text-[15px] text-texto-secundario leading-relaxed">{b.text}</p>
                {b.value && (
                  <p className="font-body text-[14px] mt-3">
                    <span className="text-texto-cinza">Valor: </span>
                    <span className="line-through text-texto-cinza">{b.value}</span>
                    {" "}
                    <span className="font-bold text-verde-musgo">Incluído</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionBonus;
