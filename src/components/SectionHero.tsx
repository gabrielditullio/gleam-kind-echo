import { useEffect, useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import logoDoma from "@/assets/logo-doma.png";
import heroPhoto from "@/assets/hero-paolla.jpg";
import paymentIcons from "@/assets/payment-icons.png";
import { useCheckout } from "@/contexts/CheckoutContext";
import CornerOrnaments from "./CornerOrnaments";

const SectionHero = () => {
  const { openCheckout } = useCheckout();
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
    <section className="bg-plum-dark relative">
      <CornerOrnaments />
      <div className="mx-auto px-5 md:px-10 py-12 md:py-20" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <div
            {...anim(0, 600, "fade")}
            className={`${anim(0, 600, "fade").className} w-full md:w-[45%] flex-shrink-0 order-2 md:order-1`}
          >
            <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img src={heroPhoto} alt="Dra. Paolla ao lado de cavalo" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>

          <div className="w-full md:w-[55%] order-1 md:order-2">
            <div {...anim(200, 400, "fade-down")}>
              <img src={logoDoma} alt="Formação em Doma Comportamental" className="w-[260px] md:w-[340px] h-auto" />
            </div>

            <div {...anim(400, 600, "fade-up")} style={{ ...anim(400, 600, "fade-up").style, marginTop: 32 }}>
              <h1 className="font-display font-bold text-[36px] md:text-[48px] leading-[1.2] md:leading-[1.15] text-neutral-50">
                O método que já transformou{" "}
                a vida de mais de{" "}
                <span className="text-sand-light">600 cavalos</span>{" "}
                — e vai transformar a do seu.
              </h1>
            </div>

            <div {...anim(800, 400, "fade")} style={{ ...anim(800, 400, "fade").style, marginTop: 24 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {checks.map((c) => (
                  <div key={c.text} className="flex items-center gap-2">
                    {c.icon === "x" ? (
                      <XCircle size={16} className="text-coral-dark flex-shrink-0" />
                    ) : (
                      <CheckCircle size={16} className="text-sage flex-shrink-0" />
                    )}
                    <span className="font-body text-[14px] text-neutral-200">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div {...anim(1000, 400, "fade-scale")} style={{ ...anim(1000, 400, "fade-scale").style, marginTop: 32 }}>
              <button
                onClick={openCheckout}
                className="group relative inline-flex items-center justify-center gap-2 bg-coral text-white font-body font-semibold text-[15px] uppercase tracking-[0.05em] px-7 py-3.5 rounded-[8px] transition-all duration-150 hover:bg-coral-dark w-full md:w-auto overflow-hidden cursor-pointer"
              >
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
              </button>
            </div>

            <div {...anim(1200, 300, "fade")} style={{ ...anim(1200, 300, "fade").style, marginTop: 14 }}>
              <img src={paymentIcons} alt="Formas de pagamento: Kiwify, Mastercard, Visa, Elo, PayPal" className="w-[300px] h-auto opacity-35 grayscale brightness-200 mx-auto block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
