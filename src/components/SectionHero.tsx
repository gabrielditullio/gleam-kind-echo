import { useEffect, useState } from "react";
import { X, Check, CreditCard } from "lucide-react";

const SectionHero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number, extra = "") =>
    `transition-all duration-[600ms] ease-out ${loaded ? `opacity-100 translate-y-0 scale-100 ${extra}` : "opacity-0 translate-y-5 scale-95"}`;

  const negatives = ["SEM FORÇA", "SEM EXAUSTÃO PSICOLÓGICA"];
  const positives = ["SEM DEPENDER DE TREINADOR", "SEM ACHISMO"];

  return (
    <section style={{ backgroundColor: "hsl(var(--fundo-escuro))", paddingTop: "44px" }}>
      <div className="mx-auto px-5 md:px-10 py-16 md:py-24" style={{ maxWidth: "1200px" }}>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo placeholder */}
          <div
            className={`w-full md:w-[45%] flex-shrink-0 transition-all duration-[600ms] ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="w-full bg-cover bg-center bg-no-repeat"
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, hsl(var(--fundo-escuro-2)) 0%, hsl(var(--marrom-escuro)) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            {/* Badge */}
            <p
              className={`font-body font-medium text-[13px] uppercase tracking-[2px] mb-6 ${anim(200)}`}
              style={{ color: "hsl(var(--dourado-claro))", transitionDelay: "200ms" }}
            >
              Formação em Doma Comportamental
            </p>

            {/* Headline */}
            <h1
              className={`font-headline font-bold text-h1-mobile md:text-[44px] leading-[1.2] mb-6 ${anim(400)}`}
              style={{ transitionDelay: "400ms" }}
            >
              <span style={{ color: "#F0EDE7" }}>
                O método que vai te dar autonomia{" "}
                para entender, cuidar e proteger{" "}
                o seu cavalo —{" "}
              </span>
              <span style={{ color: "hsl(var(--dourado-claro))" }}>com ciência.</span>
            </h1>

            {/* Checks / X */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 ${anim(800)}`}
              style={{ transitionDelay: "800ms" }}
            >
              {negatives.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <X size={16} style={{ color: "hsl(var(--vermelho-terroso))" }} />
                  <span className="font-body text-[14px] text-white">{t}</span>
                </div>
              ))}
              {positives.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check size={16} style={{ color: "hsl(var(--verde-musgo))" }} />
                  <span className="font-body text-[14px] text-white">{t}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mb-6 ${anim(1000)}`}
              style={{ transitionDelay: "1000ms" }}
            >
              <a
                href="#cta"
                className="group inline-flex items-center justify-center gap-2 bg-dourado hover:brightness-90 text-white font-body font-bold text-[16px] uppercase px-10 py-4 transition-all duration-150 w-full md:w-auto"
                style={{ borderRadius: "10px" }}
              >
                Quero proteger meu cavalo
                <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Payment icons */}
            <div
              className={`flex items-center gap-4 ${anim(1200)}`}
              style={{ transitionDelay: "1200ms" }}
            >
              {["Hotmart", "Mastercard", "Visa", "PayPal"].map((name) => (
                <span
                  key={name}
                  className="font-body text-[11px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
