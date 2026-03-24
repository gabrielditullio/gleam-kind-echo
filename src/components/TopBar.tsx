import { useEffect, useState } from "react";

const TopBar = () => {
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
        className="font-body font-bold text-[14px] text-white px-2 py-0.5"
        style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", minWidth: "32px", textAlign: "center" }}
      >
        {value}
      </span>
      <span className="font-body text-[9px] text-texto-cinza mt-0.5">{label}</span>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center md:justify-between px-4 md:px-8"
      style={{ height: "44px", backgroundColor: "hsl(var(--marrom-escuro))" }}
    >
      {/* Urgency text */}
      <p className="hidden md:block font-body font-bold text-[12px] text-white tracking-wide uppercase">
        PRIMEIRAS 24H COM R$500 DE DESCONTO
      </p>
      <p className="md:hidden font-body font-bold text-[11px] text-white tracking-wide uppercase">
        R$500 OFF · PRIMEIRAS 24H
      </p>

      {/* Countdown */}
      <div className="hidden md:flex items-center gap-1 mx-4">
        <span className="font-body text-[11px] text-texto-cinza mr-2 uppercase">Acaba em</span>
        <TimeBox value={pad(timeLeft.days)} label="DIAS" />
        <span className="text-white/40 text-[12px] mx-0.5">:</span>
        <TimeBox value={pad(timeLeft.hours)} label="HRS" />
        <span className="text-white/40 text-[12px] mx-0.5">:</span>
        <TimeBox value={pad(timeLeft.mins)} label="MINS" />
        <span className="text-white/40 text-[12px] mx-0.5">:</span>
        <TimeBox value={pad(timeLeft.secs)} label="SEGS" />
      </div>

      {/* Mobile countdown (compact) */}
      <div className="flex md:hidden items-center gap-1 ml-3">
        <TimeBox value={pad(timeLeft.hours)} label="HRS" />
        <span className="text-white/40 text-[10px]">:</span>
        <TimeBox value={pad(timeLeft.mins)} label="MIN" />
        <span className="text-white/40 text-[10px]">:</span>
        <TimeBox value={pad(timeLeft.secs)} label="SEG" />
      </div>

      {/* CTA button */}
      <a
        href="#cta"
        className="hidden md:inline-flex items-center font-body font-bold text-[12px] text-white uppercase transition-all duration-150 hover:brightness-90"
        style={{
          backgroundColor: "hsl(var(--dourado))",
          padding: "6px 16px",
          borderRadius: "6px",
        }}
      >
        Garantir Desconto →
      </a>
    </div>
  );
};

export default TopBar;
