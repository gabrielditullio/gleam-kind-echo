import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

const checks = [
  "Libere acesso a todos os módulos",
  "Assista as primeiras aulas",
  "Entre na comunidade",
  "Participe da sua primeira semana",
];

const SectionGarantia = () => {
  const { openCheckout } = useCheckout();
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
        style={{ background: "linear-gradient(to bottom, hsl(var(--roxo-profundo)), hsl(var(--off-white)))" }}
      />

      <div className="bg-off-white py-section-mobile md:py-section-desktop">
        <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 900 }}>
          <div
            className="flex flex-col md:flex-row items-center gap-10 transition-all duration-[600ms] ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            {/* Seal */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Outer dashed ring */}
                <div
                  className="absolute rounded-full"
                  style={{ width: 220, height: 220, border: "2px dashed hsl(var(--dourado))" }}
                />
                {/* Inner circle */}
                <div
                  className="rounded-full bg-dourado flex flex-col items-center justify-center"
                  style={{ width: 200, height: 200, border: "4px solid hsl(var(--roxo-profundo))" }}
                >
                  <span className="font-headline font-bold text-[72px] text-roxo-profundo leading-none">7</span>
                  <span className="font-body font-bold text-[16px] text-roxo-profundo uppercase -mt-1">DIAS</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="font-headline font-bold text-[22px] md:text-[28px] text-roxo-profundo mb-5">
                7 dias de garantia. Sem burocracia.
              </h2>

              <div className="space-y-2 mb-4">
                {checks.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${400 + i * 80}ms`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-10px)",
                    }}
                  >
                    <CheckCircle size={18} className="text-verde-musgo flex-shrink-0" />
                    <span className="font-body text-[16px] text-texto-corpo">{c}</span>
                  </div>
                ))}
              </div>

              <p className="font-body font-bold text-[18px] text-roxo-profundo mt-4">
                E só depois decida se é pra você.
              </p>
              <p className="font-body text-[16px] text-texto-corpo mt-3 leading-relaxed">
                Com a garantia incondicional de 7 dias, você pode viver o início da formação e decidir se continua ou não — 100% baseado na sua própria experiência.
              </p>
              <p className="font-body font-medium text-[16px] text-roxo-profundo mt-2">
                Se mudar de ideia, basta solicitar o reembolso. Cada centavo volta pra sua conta.
              </p>

              <button
                onClick={openCheckout}
                className="group relative inline-flex items-center justify-center gap-2 bg-verde-cta text-white font-body font-bold text-[16px] uppercase px-10 py-4 rounded-[10px] transition-all duration-150 hover:brightness-90 mt-6 w-full md:w-auto overflow-hidden cursor-pointer"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Quero entrar com risco zero
                  <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionGarantia;
