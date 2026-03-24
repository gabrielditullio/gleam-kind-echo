import { useEffect, useRef, useState } from "react";
import paymentIcons from "@/assets/payment-icons.png";
import logoDoma from "@/assets/logo-doma.png";
import { useCheckout } from "@/contexts/CheckoutContext";
import SectionDivider from "./SectionDivider";
import CornerOrnaments from "./CornerOrnaments";

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
    <section id="cta" className="bg-plum-dark relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand/[0.03] to-transparent pointer-events-none" />
      <CornerOrnaments />
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

      <div ref={ref} className="mx-auto px-5 md:px-10 py-section-mobile md:py-section-desktop text-center" style={{ maxWidth: 600 }}>

        {/* Logo placement */}
        <div className="flex justify-center mb-8">
          <img src={logoDoma} alt="Formação em Doma Comportamental" className="w-[280px] md:w-[350px] h-auto opacity-60" />
        </div>
        <SectionDivider />

        {/* Price block */}
        <div
          className="transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p className="font-body text-lg text-coral line-through">De R$ 1.997,00</p>

          <p className="font-body font-semibold text-sm uppercase tracking-[0.1em] text-neutral-400 mt-4">
            Por apenas 12x de
          </p>

          <div className="flex items-start justify-center mt-2">
            <span className="font-display text-3xl text-sand mt-3">R$</span>
            <span className="font-display font-bold text-[80px] md:text-[96px] leading-none text-sand">154</span>
            <span className="font-display text-3xl text-sand mt-3">,82</span>
          </div>

          <p className="font-body text-sm text-neutral-400 mt-2">ou R$ 1.497 à vista no boleto ou PIX</p>
        </div>

        <SectionDivider />

        {/* CTA Button */}
        <button
          ref={btnRef}
          onClick={openCheckout}
          className="group relative w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-coral text-white font-body font-semibold text-[15px] uppercase tracking-[0.05em] py-4 px-8 rounded-lg transition-all duration-150 hover:bg-coral-dark overflow-hidden cursor-pointer"
        >
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            ✦ Quero me inscrever agora
            <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
          </span>
        </button>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
          <span className="text-neutral-400 text-sm flex items-center gap-1">⚡ Acesso imediato</span>
          <span className="text-neutral-400 text-sm">·</span>
          <span className="text-neutral-400 text-sm flex items-center gap-1">🔒 Pagamento seguro</span>
          <span className="text-neutral-400 text-sm">·</span>
          <span className="text-neutral-400 text-sm flex items-center gap-1">📅 12 meses de acesso</span>
        </div>

        {/* Payment icons */}
        <img
          src={paymentIcons}
          alt="Meios de pagamento: Kiwify, Mastercard, Visa, Elo, PayPal"
          className="mx-auto mt-4 w-[300px] h-auto opacity-40 grayscale brightness-200"
        />

        {/* Alumni section */}
        <div
          className="mt-10 pt-8 text-center transition-all duration-500 ease-out"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            opacity: visible ? 1 : 0,
            transitionDelay: "400ms",
          }}
        >
          <span className="inline-block font-body font-semibold text-xs text-neutral-50 bg-sage rounded-full px-3 py-1">
            🎓 ALUNO
          </span>
          <p className="font-body font-semibold text-base text-neutral-50 mt-2">Já é meu aluno?</p>
          <p className="font-body text-sm text-neutral-400">Você tem desconto especial.</p>
          <div className="flex justify-center mt-3">
            <button
              onClick={openCheckout}
              className="group flex items-center justify-center gap-2 font-body font-semibold text-sm text-sage border-2 border-sage rounded-lg py-3 px-6 transition-all duration-150 hover:bg-sage hover:text-white cursor-pointer w-full max-w-md"
            >
              Garantir meu desconto de aluno
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOferta;
