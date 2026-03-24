import { useEffect, useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";

const SectionHero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number, duration: number, type: string) => {
    const base = `transition-all ease-out ${loaded ? "opacity-100" : "opacity-0"}`;
    const transforms: Record<string, string> = {
      "fade": "",
      "fade-up": loaded ? "translate-y-0" : "translate-y-5",
      "fade-down": loaded ? "translate-y-0" : "-translate-y-2.5",
      "fade-scale": loaded ? "scale-100" : "scale-95",
    };
    return {
      className: `${base} ${transforms[type] || ""}`,
      style: { transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` } as React.CSSProperties,
    };
  };

  const checks = [
    { icon: "x", text: "SEM FORÇA" },
    { icon: "x", text: "SEM EXAUSTÃO PSICOLÓGICA" },
    { icon: "check", text: "SEM DEPENDER DE TREINADOR" },
    { icon: "check", text: "SEM ACHISMO" },
  ];

  return (
    <section className="bg-roxo-profundo">
      <div className="mx-auto px-5 md:px-10 py-12 md:py-20" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Photo placeholder — left on desktop, bottom on mobile */}
          <div
            {...anim(0, 600, "fade")}
            style={{
              ...anim(0, 600, "fade").style,
              order: undefined,
            }}
            className={`${anim(0, 600, "fade").className} w-full md:w-[45%] flex-shrink-0 order-2 md:order-1`}
          >
            <div
              className="w-full flex items-center justify-center rounded-xl"
              style={{
                aspectRatio: "3/4",
                background: "rgba(74,45,94,0.3)",
                boxShadow: "inset 0 0 60px rgba(45,27,61,0.5)",
              }}
            >
              <p className="font-body text-[14px] text-center px-8" style={{ color: "rgba(255,255,255,0.3)" }}>
                FOTO HERO — Paolla ao lado de cavalo
              </p>
            </div>
          </div>

          {/* Text content — right on desktop, top on mobile */}
          <div className="w-full md:w-[55%] order-1 md:order-2">
            {/* Logo placeholder */}
            <div {...anim(200, 400, "fade-down")}>
              <img src={logoDoma} alt="Formação em Doma Comportamental" className="w-[160px] md:w-[200px] h-auto" />
            </div>

            {/* Headline */}
            <div {...anim(400, 600, "fade-up")} style={{ ...anim(400, 600, "fade-up").style, marginTop: 32 }}>
              <h1 className="font-headline font-bold text-[30px] md:text-[44px] leading-[1.2] text-white">
                O método que já transformou{" "}
                a vida de mais de{" "}
                <span className="text-dourado-claro">600 cavalos</span>{" "}
                — e vai transformar a do seu.
              </h1>
            </div>

            {/* Checks / X */}
            <div {...anim(800, 400, "fade")} style={{ ...anim(800, 400, "fade").style, marginTop: 24 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {checks.map((c) => (
                  <div key={c.text} className="flex items-center gap-2">
                    {c.icon === "x" ? (
                      <XCircle size={16} className="text-vermelho-terroso flex-shrink-0" />
                    ) : (
                      <CheckCircle size={16} className="text-verde-musgo flex-shrink-0" />
                    )}
                    <span className="font-body text-[14px] text-white">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div {...anim(1000, 400, "fade-scale")} style={{ ...anim(1000, 400, "fade-scale").style, marginTop: 32 }}>
              <a
                href="#cta"
                className="group relative inline-flex items-center justify-center gap-2 bg-dourado text-white font-body font-bold text-[16px] uppercase px-10 py-4 rounded-[10px] transition-all duration-150 hover:brightness-90 w-full md:w-auto overflow-hidden"
              >
                {/* Shiny hover effect */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Quero proteger meu cavalo
                  <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
                </span>
              </a>
            </div>

            {/* Payment icons */}
            <div {...anim(1200, 300, "fade")} style={{ ...anim(1200, 300, "fade").style, marginTop: 16 }}>
              <div className="flex items-center gap-4">
                {["Hotmart", "Mastercard", "Visa", "PayPal"].map((name) => (
                  <span
                    key={name}
                    className="font-body text-[11px] uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)", lineHeight: "28px" }}
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
