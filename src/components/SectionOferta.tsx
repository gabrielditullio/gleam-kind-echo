import { useEffect, useRef, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import paymentIcons from "@/assets/payment-icons.png";
import { useCheckout } from "@/contexts/CheckoutContext";
import SectionLabel from "./SectionLabel";
import SectionOrnament from "./SectionOrnament";

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

  const badges = [
    "Acesso imediato",
    "Pagamento seguro",
    "12 meses de acesso",
  ];

  return (
    <section id="cta" style={{ background: "linear-gradient(180deg, hsl(var(--plum-dark)) 0%, rgba(66,34,76,0.6) 100%)" }}>
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

      {/* Gradient transition from ancoragem */}
      <div className="h-[200px] pointer-events-none" style={{ background: "linear-gradient(to bottom, hsl(var(--plum-dark)), transparent)" }} />

      <div ref={ref} className="mx-auto px-5 md:px-10 pb-section-mobile md:pb-section-desktop text-center" style={{ maxWidth: 600 }}>
        <SectionLabel text="SEU INVESTIMENTO" dark />
        <SectionOrnament />

        {/* Price block */}
        <div
          className="transition-all duration-[600ms] ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p className="font-body text-[18px] text-coral line-through">De R$ 2.058</p>
          <p className="font-body font-semibold text-[14px] uppercase tracking-[0.1em] text-neutral-400 mt-4">
            Por apenas 12x de
          </p>

          <p className="mt-2">
            <span className="font-body font-semibold text-[28px] text-neutral-50 align-top leading-none">R$</span>
            <span className="font-headline font-bold text-[80px] text-neutral-50 leading-none">83</span>
            <span className="font-body font-semibold text-[28px] text-neutral-50 align-super leading-none">,08</span>
          </p>

          <p className="font-body text-[16px] text-neutral-400 mt-2">ou R$ 997 à vista</p>
        </div>

        <SectionOrnament />

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            ref={btnRef}
            onClick={openCheckout}
            className="group relative flex items-center justify-center gap-2 bg-coral text-white font-body font-semibold text-[15px] uppercase tracking-[0.05em] py-4 px-10 rounded-[8px] transition-all duration-150 hover:bg-coral-dark overflow-hidden cursor-pointer w-full"
            style={{ maxWidth: 420 }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />
              Quero me inscrever agora
              <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">→</span>
            </span>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 flex-wrap mt-3">
          {badges.map((b) => (
            <span key={b} className="flex items-center gap-1.5 font-body text-[13px] text-neutral-400">
              <Check size={14} className="text-sage" />
              {b}
            </span>
          ))}
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
          <span className="inline-block font-body font-semibold text-[12px] text-white bg-sage rounded-full px-3 py-1">
            🎓 ALUNO
          </span>
          <p className="font-body font-semibold text-[16px] text-neutral-50 mt-2">Já é meu aluno?</p>
          <p className="font-body text-[14px] text-neutral-400">Você tem desconto especial.</p>
          <div className="flex justify-center mt-3">
            <button
              onClick={openCheckout}
              className="group flex items-center justify-center gap-2 font-body font-semibold text-[14px] text-sage border-2 border-sage rounded-[8px] py-3 px-6 transition-all duration-150 hover:bg-sage hover:text-white cursor-pointer w-full"
              style={{ maxWidth: 420 }}
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
