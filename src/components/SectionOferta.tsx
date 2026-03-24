import { useEffect, useRef, useState } from "react";
import logoDoma from "@/assets/logo-doma.png";
import { useCheckout } from "@/contexts/CheckoutContext";

function AnimatedPrice({ visible }: { visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 997));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible]);
  return <>{count}</>;
}

const SectionOferta = () => {
  const { openCheckout } = useCheckout();
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [shaken, setShaken] = useState(false);

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

  // Micro-shake after 3s
  useEffect(() => {
    if (!visible || shaken) return;
    const t = setTimeout(() => {
      const btn = btnRef.current;
      if (!btn) return;
      btn.style.animation = "micro-shake 400ms ease-in-out";
      btn.addEventListener("animationend", () => { btn.style.animation = ""; }, { once: true });
      setShaken(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [visible, shaken]);

  return (
    <section className="bg-roxo-profundo py-section-mobile md:py-section-desktop" id="cta">
      <style>{`
        @keyframes micro-shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(2px); }
          40% { transform: translateX(-2px); }
          60% { transform: translateX(1px); }
          80% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div ref={ref} className="mx-auto px-5 md:px-10" style={{ maxWidth: 600 }}>
        {/* Above card */}
        <div
          className="text-center mb-8 transition-all duration-500 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)" }}
        >
          <img src={logoDoma} alt="Formação em Doma Comportamental" className="mx-auto mb-4 w-[280px] h-auto" />
          <p className="font-body font-medium text-[16px] text-dourado-claro">
            Criado por quem já trabalhou 600+ cavalos.
          </p>
          <p className="font-body font-medium text-[16px] text-dourado-claro">
            Esse conhecimento não existe em nenhum outro lugar do Brasil.
          </p>
        </div>

        {/* Offer card */}
        <div
          className="relative bg-white rounded-[20px] p-8 md:p-10 mx-auto transition-all duration-[600ms] ease-out"
          style={{
            maxWidth: 520,
            border: "2px solid hsl(var(--dourado))",
            boxShadow: "0 8px 40px rgba(45,27,61,0.25)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
            transitionDelay: "200ms",
          }}
        >
          {/* Discount badge */}
          <div
            className="absolute flex flex-col items-center justify-center rounded-full bg-vermelho-terroso"
            style={{
              width: 80, height: 80,
              top: -20, right: -20,
              transform: "rotate(-15deg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <span className="font-body font-bold text-[18px] text-white leading-none">R$500</span>
            <span className="font-body font-bold text-[10px] text-white uppercase">Desconto</span>
          </div>

          <h3 className="font-headline font-bold text-[24px] text-roxo-profundo text-center mb-4">
            Então, qual vai ser o seu investimento?
          </h3>

          <p className="font-body text-[16px] text-texto-corpo text-center">
            Com tudo que está incluso — módulos completos, cases reais em tempo real, encontros ao vivo mensais, comunidade com minha participação — o valor justo seria, no mínimo, R$ 1.497.
          </p>

          <p className="font-body font-medium text-[16px] text-texto-corpo text-center mt-2">
            Mas eu quero que o máximo de pessoas tenha acesso a esse conhecimento.
          </p>

          <p className="font-body font-bold text-[16px] text-roxo-profundo text-center mt-6">
            Entrando hoje, você paga apenas...
          </p>

          {/* Price block */}
          <div className="text-center mt-4">
            <p className="font-body text-[18px] text-texto-cinza line-through">DE R$ 1.497</p>
            <p className="font-body text-[14px] text-texto-cinza mt-1">POR</p>
            <p className="mt-1">
              <span className="font-body font-bold text-[28px] text-roxo-profundo align-top leading-none">R$</span>
              <span className="font-headline font-bold text-[64px] text-roxo-profundo leading-none">
                <AnimatedPrice visible={visible} />
              </span>
            </p>
            <p className="font-body text-[14px] text-texto-cinza mt-1">à vista no boleto ou PIX</p>
            <p className="font-body font-bold text-[16px] text-roxo-profundo mt-1">ou 12x de R$ 96,06</p>
          </div>

          {/* CTA */}
          <button
            ref={btnRef}
            onClick={openCheckout}
            className="group relative flex items-center justify-center gap-2 bg-verde-cta text-white font-body font-bold text-[18px] uppercase py-[18px] rounded-[10px] transition-all duration-150 hover:brightness-90 w-full mt-6 overflow-hidden cursor-pointer"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Quero entrar na formação
              <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
            </span>
          </a>

          {/* Payment icons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {["Hotmart", "Mastercard", "Visa", "PayPal"].map((name) => (
              <span key={name} className="font-body text-[11px] uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>
                {name}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div className="border-t mt-6 mb-6" style={{ borderColor: "hsl(var(--creme-roxo))" }} />

          {/* Student offer */}
          <div className="text-center">
            <span className="inline-block font-body font-bold text-[12px] text-white bg-verde-musgo rounded-full px-3 py-1">
              🎓 ALUNO
            </span>
            <p className="font-body font-bold text-[16px] text-roxo-profundo mt-2">Já é meu aluno?</p>
            <p className="font-body text-[14px] text-texto-secundario">Você tem desconto especial.</p>
            <a
              href="#aluno"
              className="flex items-center justify-center gap-2 font-body font-bold text-[14px] text-verde-musgo border-2 border-verde-musgo rounded-[10px] py-3 px-6 mt-3 w-full transition-all duration-150 hover:bg-verde-musgo hover:text-white"
            >
              Garantir meu desconto de aluno
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOferta;
