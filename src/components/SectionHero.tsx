import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

const SectionHero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number, extra = "") => ({
    className: `transition-all ease-out ${loaded ? `opacity-100 translate-y-0 scale-100 ${extra}` : "opacity-0 translate-y-5 scale-95"}`,
    style: { transitionDelay: `${delay}ms`, transitionDuration: "600ms" },
  });

  const negatives = ["SEM FORÇA", "SEM EXAUSTÃO PSICOLÓGICA"];
  const positives = ["SEM DEPENDER DE TREINADOR", "SEM ACHISMO"];

  return (
    <section className="bg-roxo-profundo pt-[40px] md:pt-[44px]">
      <div className="mx-auto px-5 md:px-10 py-16 md:py-24" style={{ maxWidth: "1200px" }}>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo placeholder */}
          <div
            className={`w-full md:w-[45%] flex-shrink-0 transition-all duration-[600ms] ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="w-full flex items-center justify-center"
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, hsl(var(--roxo-medio)) 0%, hsl(var(--burgundy)) 100%)",
              }}
            >
              <div className="text-center px-8">
                <p className="font-body text-[14px] text-texto-cinza mb-2">[ PLACEHOLDER — FOTO HERO ]</p>
                <p className="font-body text-[12px] text-texto-cinza/60 leading-relaxed">
                  Paolla em pé ao lado de um cavalo, de frente pro fotógrafo.
                  Fundo: pasto/campo aberto. Formato vertical 3:4.
                </p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-[55%]">
            {/* Logo placeholder */}
            <div {...fade(200)}>
              <div className="mb-6">
                <p className="font-body font-medium text-[10px] uppercase tracking-[3px] text-white/60">FORMAÇÃO EM</p>
                <p className="font-headline font-bold text-[36px] md:text-[44px] text-white leading-none tracking-wide">
                  DᎧMA
                </p>
                <p className="font-body font-medium text-[10px] uppercase tracking-[3px] text-white/60">COMPORTAMENTAL</p>
              </div>
            </div>

            {/* Headline */}
            <div {...fade(400)}>
              <h1 className="font-headline font-bold text-[30px] md:text-[44px] leading-[1.2] mb-6 text-white">
                O método que já transformou
                a vida de mais de{" "}
                <span className="text-dourado-claro">600 cavalos</span>{" "}
                — e vai transformar a do seu.
              </h1>
            </div>

            {/* Checks / X */}
            <div {...fade(800)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {negatives.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <X size={16} className="text-vermelho-terroso" />
                    <span className="font-body text-[14px] text-white">{t}</span>
                  </div>
                ))}
                {positives.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check size={16} className="text-verde-musgo" />
                    <span className="font-body text-[14px] text-white">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div {...fade(1000)}>
              <div className="mb-6">
                <a
                  href="#cta"
                  className="group relative inline-flex items-center justify-center gap-2 bg-dourado hover:brightness-90 text-white font-body font-bold text-[16px] uppercase px-10 py-4 rounded-[10px] transition-all duration-150 w-full md:w-auto overflow-hidden"
                >
                  {/* Shiny effect */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                      animation: "none",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Quero proteger meu cavalo
                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Payment icons */}
            <div {...fade(1200)}>
              <div className="flex items-center gap-4">
                {["Hotmart", "Mastercard", "Visa", "PayPal"].map((name) => (
                  <span
                    key={name}
                    className="font-body text-[11px] uppercase tracking-wider text-white/40"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
