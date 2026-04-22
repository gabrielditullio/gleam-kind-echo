import { useEffect, useState, useRef } from "react";
import CheckoutPopup from "@/components/CheckoutPopup";
import { CheckoutProvider, useCheckout } from "@/contexts/CheckoutContext";

/**
 * FLC1 V3 — Paolla Luchin · Fale a Língua do Cavalo (VSL)
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { id?: string },
        HTMLElement
      >;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const REVEAL_AFTER_MS = 527_000;
const VTURB_PLAYER_ID = "ab-69e670b33a084e4af1262344";
const VTURB_VIDEO_ID = "69e670b33a084e4af1262344";
const VTURB_ACCOUNT = "4aa0a2f6-6a95-415f-bc8d-01ede94868bc";
const VTURB_SCRIPT_SRC = `https://scripts.converteai.net/${VTURB_ACCOUNT}/ab-test/${VTURB_VIDEO_ID}/player.js`;

const FLC_CONFIG = {
  source: "flc1_v3",
  product: "entenda-seu-cavalo",
  kiwifyCheckoutId: "Kc9MOhe",
  leadValue: 197,
  popupHeadline: "Falta pouco para garantir sua vaga",
  popupSubheadline: "Preencha seus dados e prossiga para o checkout seguro",
  popupCta: "Continuar para o Checkout",
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

:root{
  --bg:          #0a1a1a;
  --teal-1:      #1a6b6b;
  --teal-2:      #0d4a4a;
  --teal-3:      #071e1e;
  --accent:      #e8f000;
  --accent-hot:  #f4ff3a;
  --accent-dim:  #b8c000;
  --ink:         #f3f6f2;
  --ink-mute:    rgba(243,246,242,.62);
  --ink-soft:    rgba(243,246,242,.82);
  --line:        rgba(232,240,0,.18);
  --line-soft:   rgba(243,246,242,.08);
  --danger:      #ff5a4d;
}

html, body, #root { background: var(--bg); }
.flc1 { font-family: 'Roboto', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); min-height: 100vh; position: relative; }
.flc1 ::selection { background: var(--accent); color: var(--teal-3); }

.flc1 .grain{
  position: fixed; inset: 0; pointer-events:none; z-index: 60;
  mix-blend-mode: soft-light; opacity:.35;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.94  0 0 0 0 0.9  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

.flc1 .urgency{
  position: relative;
  background: linear-gradient(90deg, #2a0f0c 0%, #3c1510 50%, #2a0f0c 100%);
  color: #ffd9d5;
  font-size: 13px; font-weight: 500; letter-spacing: .02em;
  text-align: center;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,90,77,.25);
}
.flc1 .urgency .dot{
  display: inline-block; width: 8px; height: 8px; border-radius: 9999px;
  background: var(--danger);
  box-shadow: 0 0 0 0 rgba(255,90,77,.6);
  animation: pulseDot 1.6s ease-out infinite;
  margin-right: 10px; vertical-align: middle;
}
@keyframes pulseDot{
  0%   { box-shadow: 0 0 0 0 rgba(255,90,77,.55); }
  70%  { box-shadow: 0 0 0 12px rgba(255,90,77,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,90,77,0); }
}

.flc1 .hero{
  position: relative; overflow: hidden;
  background:
    radial-gradient(1100px 520px at 20% -10%, rgba(26,107,107,.55), transparent 60%),
    radial-gradient(900px 500px at 110% 30%, rgba(232,240,0,.12), transparent 60%),
    linear-gradient(180deg, var(--teal-2) 0%, var(--teal-3) 70%, var(--bg) 100%);
  padding: 44px 20px 56px;
}
.flc1 .hero::before{
  content:"";
  position:absolute; inset: -2px 0 auto 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,240,0,.55), transparent);
}
.flc1 .hero-inner{ max-width: 920px; margin: 0 auto; }

.flc1 .badge{
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 9999px;
  background: rgba(232,240,0,.1);
  border: 1px solid rgba(232,240,0,.35);
  color: var(--accent);
  font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
}
.flc1 .badge .sparkle{ font-size: 12px; }

.flc1 h1.hero-title{
  font-weight: 900;
  font-size: clamp(30px, 5.8vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  margin: 22px 0 14px;
  text-wrap: balance;
}
.flc1 h1.hero-title .hl{
  color: var(--accent);
  background: linear-gradient(180deg, var(--accent-hot), var(--accent));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: .08em;
}

.flc1 .hero-sub{
  font-size: 17px; line-height: 1.55;
  color: var(--ink-soft);
  max-width: 720px;
  margin: 0 auto 12px;
  text-align: center;
}
.flc1 .hero-inner { text-align: center; }
.flc1 .arrow-down{
  display: inline-block; margin-top: 6px; font-size: 22px;
  animation: bounce 1.6s ease-in-out infinite;
  color: var(--accent);
}
@keyframes bounce{
  0%,100%{ transform: translateY(0); }
  50%    { transform: translateY(8px); }
}

.flc1 .sound-pill{
  display: inline-flex; align-items: center; gap: 8px;
  margin: 18px auto 22px;
  padding: 10px 18px; border-radius: 9999px;
  background: rgba(10,26,26,.7);
  border: 1px solid rgba(232,240,0,.4);
  color: var(--ink);
  font-size: 13px; font-weight: 600; letter-spacing: .05em;
  backdrop-filter: blur(6px);
}

.flc1 .video-wrap{
  position: relative;
  margin: 0 auto;
  max-width: 820px;
  padding: 2px;
  border-radius: 14px;
  background: conic-gradient(from 180deg at 50% 50%, var(--accent), var(--teal-1), var(--accent-dim), var(--teal-2), var(--accent));
  box-shadow: 0 30px 80px -30px rgba(232,240,0,.25), 0 10px 40px -15px rgba(0,0,0,.7);
}
.flc1 .video-inner{
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  position: relative;
}
.flc1 .video-inner vturb-smartplayer,
.flc1 .video-inner .vturb-fallback{
  display: block; width: 100%; height: 100%;
}
.flc1 .vturb-fallback{
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-mute); font-size: 13px; letter-spacing: .2em; text-transform: uppercase;
  background:
    radial-gradient(closest-side, rgba(26,107,107,.4), transparent 70%),
    #000;
}

.flc1 .gift-line{
  margin-top: 18px;
  text-align: center;
  color: var(--accent);
  font-size: 15px; font-weight: 600; letter-spacing: .01em;
}

.flc1 .esconder{ display: none; }
.flc1 .esconder.revealed{
  display: block;
  animation: revealIn 900ms cubic-bezier(.2,.7,.2,1) both;
}
@keyframes revealIn{
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.flc1 .cta-wrap{
  max-width: 820px; margin: 0 auto; padding: 36px 20px 12px;
  text-align: center;
}
.flc1 .cta{
  position: relative; display: inline-flex; align-items: center; gap: 12px;
  padding: 20px 36px;
  background: linear-gradient(180deg, var(--accent-hot), var(--accent) 60%, var(--accent-dim));
  color: #0a1a1a;
  font-weight: 900;
  font-size: clamp(16px, 2.4vw, 20px);
  letter-spacing: .02em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 10px;
  box-shadow:
    0 0 0 1px rgba(10,26,26,.18) inset,
    0 18px 40px -12px rgba(232,240,0,.45),
    0 0 80px -10px rgba(232,240,0,.5);
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease, filter 220ms ease;
  animation: ctaGlow 2.4s ease-in-out infinite;
  overflow: hidden;
  will-change: transform;
}
.flc1 .cta::before{
  content:""; position:absolute; inset:0;
  background-image: linear-gradient(100deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%);
  background-size: 220% 100%;
  background-repeat: no-repeat;
  animation: ctaSheen 2.8s ease-in-out infinite;
  pointer-events: none;
}
.flc1 .cta:hover  { transform: translateY(-3px) scale(1.015); filter: saturate(1.05); }
.flc1 .cta:active { transform: translateY(0) scale(.99); transition-duration: 120ms; }
@keyframes ctaGlow{
  0%,100% { box-shadow: 0 0 0 1px rgba(10,26,26,.18) inset, 0 18px 40px -12px rgba(232,240,0,.45), 0 0 60px -10px rgba(232,240,0,.45); }
  50%     { box-shadow: 0 0 0 1px rgba(10,26,26,.18) inset, 0 22px 50px -12px rgba(232,240,0,.6),  0 0 110px -10px rgba(232,240,0,.7); }
}
@keyframes ctaSheen{
  0%   { background-position: -200% 0; }
  55%  { background-position: 220% 0; }
  100% { background-position: 220% 0; }
}
.flc1 .cta-sub{
  margin-top: 14px;
  color: var(--ink-mute);
  font-size: 12px; letter-spacing: .2em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 8px;
}

.flc1 .trust{
  max-width: 960px; margin: 10px auto 0;
  padding: 28px 20px 44px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 14px;
}
@media (max-width: 680px){
  .flc1 .trust{ grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
}
.flc1 .trust-cell{
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 20px 14px;
  background: rgba(13,74,74,.35);
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  text-align: center;
  transition: transform 260ms ease, border-color 260ms ease, background 260ms ease;
}
.flc1 .trust-cell:hover{
  transform: translateY(-2px);
  border-color: rgba(232,240,0,.28);
  background: rgba(13,74,74,.55);
}
.flc1 .trust-cell .icon{ color: var(--accent); }
.flc1 .trust-cell .big{ font-weight: 900; font-size: 20px; }
.flc1 .trust-cell .small{ font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: var(--ink-mute); }

.flc1 .section-head{ text-align: center; max-width: 820px; margin: 0 auto 36px; padding: 0 20px; }
.flc1 .kicker{
  display: inline-block;
  font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
  color: var(--accent);
  padding: 6px 12px;
  border: 1px solid rgba(232,240,0,.3);
  border-radius: 9999px;
  margin-bottom: 18px;
}
.flc1 h2.section-title{
  font-weight: 900;
  font-size: clamp(26px, 4.5vw, 40px);
  line-height: 1.1;
  letter-spacing: -.01em;
  text-wrap: balance;
}
.flc1 h2.section-title .hl{ color: var(--accent); }

.flc1 .testimonials{
  padding: 60px 20px 40px;
  background:
    radial-gradient(700px 400px at 50% 0%, rgba(26,107,107,.35), transparent 70%),
    var(--bg);
}
.flc1 .test-grid{
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 18px;
}
@media (max-width: 900px){ .flc1 .test-grid{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 520px){ .flc1 .test-grid{ grid-template-columns: 1fr; } }
.flc1 .test-card{
  position: relative;
  padding: 4px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(232,240,0,.22), rgba(26,107,107,.22));
  transition: transform 340ms cubic-bezier(.2,.7,.2,1), box-shadow 340ms ease;
}
.flc1 .test-card:hover{
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -20px rgba(232,240,0,.25), 0 12px 24px -12px rgba(0,0,0,.6);
}
.flc1 .test-inner{
  background: var(--teal-3);
  border-radius: 11px;
  overflow: hidden;
}
.flc1 .test-img{
  display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover;
  background: #0b2626;
  transition: transform 700ms cubic-bezier(.2,.7,.2,1), filter 380ms ease;
}
.flc1 .test-card:hover .test-img{ transform: scale(1.04); filter: saturate(1.1); }
.flc1 .test-meta{
  padding: 12px 14px 14px;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 12px; color: var(--ink-soft);
}
.flc1 .test-meta .name{ font-weight: 700; }
.flc1 .test-meta .stars{ color: var(--accent); letter-spacing: 1px; }

.flc1 .modules{ padding: 60px 20px; }
.flc1 .mod-grid{
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 18px;
}
@media (max-width: 900px){ .flc1 .mod-grid{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 560px){ .flc1 .mod-grid{ grid-template-columns: 1fr; } }
.flc1 .mod-card{
  position: relative;
  padding: 24px 22px 22px;
  background: linear-gradient(180deg, rgba(26,107,107,.22), rgba(7,30,30,.9));
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  overflow: hidden;
  transition: transform 340ms cubic-bezier(.2,.7,.2,1), border-color 340ms ease, background 340ms ease;
}
.flc1 .mod-card::before{
  content:""; position: absolute; inset: 0;
  background: radial-gradient(400px 220px at 100% 0%, rgba(232,240,0,.12), transparent 70%);
  opacity: 0; transition: opacity 340ms ease;
  pointer-events: none;
}
.flc1 .mod-card:hover{
  transform: translateY(-4px);
  border-color: rgba(232,240,0,.35);
  background: linear-gradient(180deg, rgba(26,107,107,.3), rgba(7,30,30,.95));
}
.flc1 .mod-card:hover::before{ opacity: 1; }
.flc1 .mod-num{
  display: inline-block;
  font-size: 12px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase;
  color: var(--accent);
  padding: 5px 10px;
  border: 1px solid rgba(232,240,0,.32);
  border-radius: 9999px;
  margin-bottom: 14px;
}
.flc1 .mod-title{ font-weight: 800; font-size: 20px; line-height: 1.2; letter-spacing: -.01em; }
.flc1 .mod-desc{ margin-top: 10px; color: var(--ink-soft); font-size: 14px; line-height: 1.55; }

.flc1 .offer{
  padding: 70px 20px 60px;
  background:
    radial-gradient(800px 420px at 50% 0%, rgba(26,107,107,.5), transparent 70%),
    linear-gradient(180deg, var(--bg) 0%, var(--teal-3) 100%);
}
.flc1 .offer-card{
  max-width: 820px; margin: 0 auto;
  padding: 38px 28px 32px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(13,74,74,.6), rgba(7,30,30,.9));
  border: 1px solid rgba(232,240,0,.3);
  box-shadow: 0 40px 100px -30px rgba(232,240,0,.22), 0 10px 30px -10px rgba(0,0,0,.7);
  text-align: center;
  position: relative;
}
.flc1 .offer-card::before{
  content:""; position: absolute; inset: -1px; border-radius: 18px; pointer-events: none;
  background: linear-gradient(135deg, rgba(232,240,0,.5), transparent 40%, transparent 60%, rgba(26,107,107,.5));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  padding: 1px;
}
.flc1 .price-x{
  font-size: 16px; font-weight: 700; letter-spacing: .02em; color: var(--ink-soft);
  margin-top: 10px;
}
.flc1 .price-big{
  display: inline-flex; align-items: baseline; gap: 6px;
  font-weight: 900;
  font-size: clamp(42px, 8vw, 72px);
  line-height: 1;
  margin: 6px 0;
  color: var(--accent);
  text-shadow: 0 0 40px rgba(232,240,0,.35);
}
.flc1 .price-big .cents{ font-size: .5em; align-self: flex-start; margin-top: .3em; letter-spacing: 0; }
.flc1 .price-alt{ color: var(--ink-soft); font-size: 14px; margin-top: 2px; }
.flc1 .pay-row{
  display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
  margin: 18px 0 22px;
}
.flc1 .pay-chip{
  font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
  padding: 6px 12px; border-radius: 9999px;
  border: 1px solid var(--line-soft);
  color: var(--ink-soft);
}
.flc1 .guarantee{
  margin-top: 22px;
  display: inline-flex; align-items: center; gap: 10px;
  color: var(--ink-mute);
  font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
}
.flc1 .guarantee .icon{ color: var(--accent); }

.flc1 footer{
  padding: 40px 20px;
  text-align: center;
  color: var(--ink-mute);
  font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
  border-top: 1px solid var(--line-soft);
  background: var(--bg);
}

@keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.flc1 .rise { animation: rise 900ms cubic-bezier(.2,.7,.2,1) both; }

@media (prefers-reduced-motion: reduce){
  .flc1 .rise, .flc1 .cta, .flc1 .cta::before, .flc1 .urgency .dot, .flc1 .arrow-down{ animation: none !important; }
  .flc1 .rise { opacity: 1 !important; transform: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Atomic SVGs                                                        */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; style?: React.CSSProperties };

function Shield({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2 L 20 5 V 11 C 20 16, 16 20, 12 22 C 8 20, 4 16, 4 11 V 5 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 12 L 11 14.5 L 15.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Play({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M7 5 V 19 L 19 12 Z" fill="currentColor" />
    </svg>
  );
}
function Spark({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2 L 13.5 10.5 L 22 12 L 13.5 13.5 L 12 22 L 10.5 13.5 L 2 12 L 10.5 10.5 Z" fill="currentColor" />
    </svg>
  );
}
function Lock({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10 V 7 a 4 4 0 0 1 8 0 V 10" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function Clock({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7 V 12 L 15.5 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Urgency bar with dynamic date                                      */
/* ------------------------------------------------------------------ */

function UrgencyBar() {
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    const d = new Date();
    setDateStr(`${d.getDate()} de ${months[d.getMonth()]}`);
  }, []);
  return (
    <div className="urgency" role="alert">
      <span className="dot" aria-hidden />
      ⚠️ Esse vídeo sai do ar hoje{dateStr ? ` — ${dateStr}` : ""}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  vTurb embed                                                        */
/* ------------------------------------------------------------------ */

function VTurbPlayer() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!document.querySelector(`script[src="${VTURB_SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = VTURB_SCRIPT_SRC;
      s.async = true;
      document.head.appendChild(s);
    }

    let attached = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 15;
    let pollId: number | undefined;
    let cleanupListener: (() => void) | undefined;

    const tryAttach = () => {
      try {
        const w = window as unknown as {
          smartplayer?: { instances?: Array<{ smartAutoPlay?: boolean; on?: (ev: string, cb: () => void) => void; video?: HTMLVideoElement }> };
        };
        const player = w.smartplayer?.instances?.[0];
        if (!player) {
          attempts += 1;
          if (attempts >= MAX_ATTEMPTS) {
            if (pollId) window.clearInterval(pollId);
          }
          return;
        }
        if (pollId) window.clearInterval(pollId);
        if (player.smartAutoPlay) return; // muted warmup — skip

        const handler = () => {
          try {
            const video = player.video;
            if (!video || !video.duration || !isFinite(video.duration)) return;
            const pct = (video.currentTime / video.duration) * 100;
            const quartiles = [25, 50, 75, 100];
            for (const q of quartiles) {
              if (pct >= q && !firedRef.current.has(q)) {
                firedRef.current.add(q);
                if (window.parent !== window) {
                  window.parent.postMessage(
                    {
                      type: "vturb_progress",
                      progress_pct: q,
                      video_id: VTURB_PLAYER_ID,
                      source: FLC_CONFIG.source,
                    },
                    "*"
                  );
                }
              }
            }
          } catch { /* never break playback */ }
        };

        if (player.on) {
          player.on("timeupdate", handler);
          attached = true;
          cleanupListener = () => {
            // smartplayer typically lacks .off — best-effort
          };
        } else if (player.video) {
          player.video.addEventListener("timeupdate", handler);
          attached = true;
          const v = player.video;
          cleanupListener = () => v.removeEventListener("timeupdate", handler);
        }
      } catch { /* swallow */ }
    };

    pollId = window.setInterval(tryAttach, 1000);
    tryAttach();

    return () => {
      if (pollId) window.clearInterval(pollId);
      if (cleanupListener) cleanupListener();
      void attached;
    };
  }, []);

  return (
    <div className="video-inner">
      <vturb-smartplayer id={VTURB_PLAYER_ID} style={{ display: "block", width: "100%", height: "100%" }}>
        <div className="vturb-fallback">Carregando aula…</div>
      </vturb-smartplayer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="rise" style={{ animationDelay: "60ms" }}>
          <span className="badge">
            <span className="sparkle">✦</span> Aula gratuita destravada
          </span>
        </div>

        <h1 className="hero-title rise" style={{ animationDelay: "160ms" }}>
          Destrave a habilidade única de{" "}
          <span className="hl">falar a língua dos cavalos</span>.
        </h1>

        <p className="hero-sub rise" style={{ animationDelay: "260ms" }}>
          Você acabou de destravar uma <strong>Aula Gratuita</strong> com uma das
          maiores referências em comportamento equino do Brasil. Assista com
          atenção — do início ao fim.
          <br />
          <span className="arrow-down" aria-hidden>↓</span>
        </p>

        <div className="rise" style={{ animationDelay: "340ms" }}>
          <span className="sound-pill">🔊 Ative o som antes de assistir</span>
        </div>

        <div className="video-wrap rise" style={{ animationDelay: "420ms" }}>
          <VTurbPlayer />
        </div>

        <div className="gift-line rise" style={{ animationDelay: "520ms" }}>
          🎁 Um presente especial será entregue a você
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA + trust row                                                    */
/* ------------------------------------------------------------------ */

function PrimaryCTA() {
  const { openCheckout } = useCheckout();
  return (
    <div className="cta-wrap">
      <button type="button" className="cta" onClick={openCheckout}>
        <Spark style={{ width: 20, height: 20 }} />
        Quero garantir minha vaga agora
        <Lock style={{ width: 16, height: 16 }} />
      </button>
      <div className="cta-sub">
        <Lock style={{ width: 12, height: 12 }} /> Pagamento 100% seguro · Kiwify
      </div>
    </div>
  );
}

function TrustRow() {
  const items = [
    { icon: <Shield style={{ width: 22, height: 22 }} />, big: "7 dias",          small: "Garantia" },
    { icon: <Clock  style={{ width: 22, height: 22 }} />, big: "1 ano",           small: "De acesso" },
    { icon: <Play   style={{ width: 22, height: 22 }} />, big: "+20h",            small: "De conteúdo" },
    { icon: <Spark  style={{ width: 22, height: 22 }} />, big: "Teoria & prática", small: "Aplicável" },
  ];
  return (
    <div className="trust">
      {items.map((it, i) => (
        <div key={i} className="trust-cell">
          <span className="icon">{it.icon}</span>
          <span className="big">{it.big}</span>
          <span className="small">{it.small}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const people = [
    { name: "Amanda Bacil",           img: "https://paollaluchin.com.br/wp-content/uploads/2026/04/dp01.webp" },
    { name: "Luciana Meguerditchian", img: "https://paollaluchin.com.br/wp-content/uploads/2026/04/dp02.webp" },
    { name: "Dany Baraldi",           img: "https://paollaluchin.com.br/wp-content/uploads/2026/04/dp03.webp" },
    { name: "Ana Castro",             img: "https://paollaluchin.com.br/wp-content/uploads/2026/04/dp04.webp" },
  ];
  return (
    <section className="testimonials">
      <div className="section-head">
        <span className="kicker">Depoimentos</span>
        <h2 className="section-title">
          O que os alunos <span className="hl">estão dizendo</span>
        </h2>
      </div>
      <div className="test-grid">
        {people.map((p, i) => (
          <figure key={i} className="test-card">
            <div className="test-inner">
              <img
                className="test-img"
                src={p.img}
                alt={`Depoimento de ${p.name}`}
                loading="lazy"
              />
              <figcaption className="test-meta">
                <span className="name">{p.name}</span>
                <span className="stars" aria-label="5 estrelas">★★★★★</span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Modules                                                            */
/* ------------------------------------------------------------------ */

function Modules() {
  const mods = [
    { n: "01", t: "Comportamento & Influência",            d: "Como o cavalo percebe o mundo e como sua presença altera o comportamento dele antes mesmo de você tocá-lo." },
    { n: "02", t: "Relações & Liderança",                   d: "A construção de uma liderança serena, clara e justa — o oposto da dominação. O cavalo escolhe seguir." },
    { n: "03", t: "Os cinco sentidos",                      d: "Visão, audição, olfato, tato e paladar: como cada sentido molda a reação do cavalo em cada interação." },
    { n: "04", t: "Como o cavalo aprende",                  d: "Reforço, timing e repetição com base em etologia aplicada — o que funciona e o que apenas confunde o animal." },
    { n: "05", t: "Linguagem corporal & leitura emocional", d: "Ler o corpo do cavalo em tempo real: tensão, relaxamento, hesitação, disposição." },
    { n: "06", t: "Bônus · +20h de conteúdo complementar",  d: "Um acervo de aulas complementares, estudos de caso e materiais de apoio para aprofundar o método." },
  ];
  return (
    <section className="modules">
      <div className="section-head">
        <span className="kicker">Os seis módulos</span>
        <h2 className="section-title">
          Um programa pensado para quem quer ir <span className="hl">além da superfície</span>
        </h2>
      </div>
      <div className="mod-grid">
        {mods.map((m) => (
          <article key={m.n} className="mod-card">
            <span className="mod-num">Módulo {m.n}</span>
            <h3 className="mod-title">{m.t}</h3>
            <p className="mod-desc">{m.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Offer                                                              */
/* ------------------------------------------------------------------ */

function Offer() {
  const { openCheckout } = useCheckout();
  return (
    <section id="checkout" className="offer">
      <div className="section-head">
        <span className="kicker">Sua vaga</span>
        <h2 className="section-title">
          Entre para o <span className="hl">Entenda Seu Cavalo</span>
        </h2>
      </div>

      <div className="offer-card">
        <div className="price-x">12×</div>
        <div className="price-big">
          R$ 20,<span className="cents">37</span>
        </div>
        <div className="price-alt">
          ou <strong style={{ color: "var(--ink)" }}>R$ 197,00 à vista</strong>
        </div>

        <div className="pay-row">
          <span className="pay-chip">Pix</span>
          <span className="pay-chip">Boleto</span>
          <span className="pay-chip">Cartão · 12×</span>
        </div>

        <button type="button" className="cta" onClick={openCheckout}>
          <Spark style={{ width: 20, height: 20 }} />
          Quero garantir minha vaga agora
          <Lock style={{ width: 16, height: 16 }} />
        </button>

        <div className="guarantee">
          <span className="icon"><Shield style={{ width: 18, height: 18 }} /></span>
          Garantia incondicional de 7 dias
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function FlcFooter() {
  return (
    <footer>
      © Paolla Luchin · Todos os direitos reservados · Comportamento Equino
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

function Flc1V3Content() {
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, closeCheckout } = useCheckout();

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = window.location.search;
    if (!qs) return;
    const incoming = new URLSearchParams(qs);
    const scope: ParentNode = rootRef.current || document;
    scope.querySelectorAll<HTMLAnchorElement>("a.kiwify-link").forEach((a) => {
      try {
        const u = new URL(a.href);
        incoming.forEach((v, k) => { u.searchParams.set(k, v); });
        a.href = u.toString();
      } catch { /* malformed href — leave alone */ }
    });
  }, [revealed]);

  return (
    <div className="flc1" ref={rootRef}>
      <style>{STYLE}</style>
      <div className="grain" aria-hidden />

      <UrgencyBar />
      <Hero />

      <section className={`esconder ${revealed ? "revealed" : ""}`} aria-hidden={!revealed}>
        <PrimaryCTA />
        <TrustRow />
      </section>

      <section className={`esconder ${revealed ? "revealed" : ""}`} aria-hidden={!revealed}>
        <Testimonials />
        <Modules />
        <Offer />
        <FlcFooter />
      </section>

      <CheckoutPopup
        isOpen={isOpen}
        onClose={closeCheckout}
        source={FLC_CONFIG.source}
        product={FLC_CONFIG.product}
        kiwifyCheckoutId={FLC_CONFIG.kiwifyCheckoutId}
        leadValue={FLC_CONFIG.leadValue}
        headline={FLC_CONFIG.popupHeadline}
        subheadline={FLC_CONFIG.popupSubheadline}
        ctaLabel={FLC_CONFIG.popupCta}
        theme="flc"
      />
    </div>
  );
}

export default function Flc1V3() {
  return (
    <CheckoutProvider>
      <Flc1V3Content />
    </CheckoutProvider>
  );
}
