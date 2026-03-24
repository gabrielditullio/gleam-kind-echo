import { useEffect, useState } from "react";
import { useCheckout } from "@/contexts/CheckoutContext";

const TopBar = () => {
  const { openCheckout } = useCheckout();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, mins: 59, secs: 59 });

  useEffect(() => {
    const endKey = "fdc-countdown-end";
    let end = localStorage.getItem(endKey);
    if (!end) {
      const d = new Date();
      d.setHours(d.getHours() + 24);
      end = d.toISOString();
      localStorage.setItem(endKey, end);
    }
    const endDate = new Date(end);

    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, endDate.getTime() - now.getTime());
      const s = Math.floor(diff / 1000);
      setTimeLeft({
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        mins: Math.floor((s % 3600) / 60),
        secs: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const TimeBox = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <span
        className="font-body font-semibold text-[14px] text-neutral-50 px-2 py-1 rounded text-center"
        style={{ background: "rgba(255,255,255,0.1)", minWidth: "36px" }}
      >
        {value}
      </span>
      <span className="font-body text-[9px] text-neutral-400 mt-0.5">{label}</span>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-plum-dark flex items-center px-4 md:px-8 h-[40px] md:h-[44px]">
      <div className="hidden md:flex items-center justify-between w-full">
        <p className="font-body font-semibold text-[13px] text-neutral-50 tracking-wide uppercase flex-shrink-0">
          PRIMEIRAS 24H COM R$500 DE DESCONTO
        </p>
        <div className="flex items-center gap-1.5">
          <span className="font-body text-[10px] text-neutral-400 mr-1 uppercase">Acaba em...</span>
          <TimeBox value={pad(timeLeft.days)} label="DIAS" />
          <span className="text-white/40 text-[12px]">:</span>
          <TimeBox value={pad(timeLeft.hours)} label="HRS" />
          <span className="text-white/40 text-[12px]">:</span>
          <TimeBox value={pad(timeLeft.mins)} label="MINS" />
          <span className="text-white/40 text-[12px]">:</span>
          <TimeBox value={pad(timeLeft.secs)} label="SEGS" />
        </div>
        <button
          onClick={openCheckout}
          className="flex-shrink-0 inline-flex items-center font-body font-semibold text-[12px] text-white uppercase tracking-[0.05em] bg-coral px-4 py-1.5 rounded-lg transition-all duration-150 hover:bg-coral-dark cursor-pointer"
        >
          Garantir Desconto →
        </button>
      </div>

      <div className="flex md:hidden items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <p className="font-body font-semibold text-[11px] text-neutral-50 tracking-wide uppercase">
            R$500 OFF · 24H
          </p>
          <div className="flex items-center gap-1">
            <TimeBox value={pad(timeLeft.hours)} label="HRS" />
            <span className="text-white/40 text-[10px]">:</span>
            <TimeBox value={pad(timeLeft.mins)} label="MIN" />
            <span className="text-white/40 text-[10px]">:</span>
            <TimeBox value={pad(timeLeft.secs)} label="SEG" />
          </div>
        </div>
        <button
          onClick={openCheckout}
          className="inline-flex items-center font-body font-semibold text-[10px] text-white uppercase tracking-[0.05em] bg-coral px-3 py-1 rounded-lg transition-all duration-150 hover:bg-coral-dark cursor-pointer"
        >
          Desconto →
        </button>
      </div>
    </div>
  );
};

export default TopBar;
