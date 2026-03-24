import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

const StickyCta = () => {
  const { openCheckout } = useCheckout();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const target = document.getElementById("cta");
    if (!target) return;
    const obs = new IntersectionObserver(
      ([e]) => setShow(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (dismissed || !show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] transition-transform duration-300 ease-out"
      style={{
        background: "rgba(42,21,48,0.95)",
        backdropFilter: "blur(8px)",
        transform: show ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="hidden md:flex items-center justify-between mx-auto px-8 h-[60px]" style={{ maxWidth: 1200 }}>
        <p className="font-body font-medium text-[15px]" style={{ color: "#DDD7D0" }}>
          Garantir minha vaga por R$997
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={openCheckout}
            className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-white uppercase tracking-[0.05em] bg-coral px-6 py-2.5 rounded-[8px] transition-all duration-150 hover:bg-coral-dark cursor-pointer"
          >
            Quero minha vaga
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-neutral-400 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex md:hidden items-center px-4 py-3">
        <button
          onClick={openCheckout}
          className="flex-1 flex items-center justify-center gap-2 font-body font-semibold text-[14px] text-white uppercase tracking-[0.05em] bg-coral py-3 rounded-[8px] transition-all duration-150 hover:bg-coral-dark cursor-pointer"
        >
          Quero minha vaga →
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="ml-3 text-neutral-400 hover:text-white transition-colors duration-150 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default StickyCta;
