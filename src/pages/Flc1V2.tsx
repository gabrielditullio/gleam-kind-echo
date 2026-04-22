import { useEffect, useState, useRef, useCallback } from "react";
import { flushSync } from "react-dom";

/**
 * FLC1 — Paolla Luchin · Comportamento Equino
 * Editorial / organic-paper direction  +  OVERDRIVE pass (C + A).
 *
 * Overdrive techniques in play:
 *  • Variable-axis letter choreography on mount (Fraunces opsz / SOFT / wght / WONK scrubs
 *    from hard-display → soft-display as each letter settles — "coming into focus")
 *  • Scroll-driven word reveals on section headlines via animation-timeline: view()
 *  • Italic cross-fade on module numerals, driven by scroll position
 *  • Self-drawing SVG underline (stroke-dashoffset animated) after hero letters settle
 *  • Scroll-driven parallax drift on the oversized `flc1` stamp
 *  • Scroll-driven vignette tightening (animated @property)
 *  • View Transitions API morphing a module row into its detail panel and back
 *  • Spring-like cubic-bezier on CTA press
 *  • Full @supports + prefers-reduced-motion fallbacks — the static version still reads well
 *
 * Content preserved from paollaluchin.com.br/flc1/ where returned verbatim by fetch.
 * Items marked `// verify:` are reconstructions (module titles, testimonial quotes,
 * expanded module bullets, video embed) that should be replaced with canonical copy.
 */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');

/* ---------- registered custom properties (so they can be animated) ---------- */
@property --hero-opsz { syntax: "<number>"; inherits: true; initial-value: 144; }
@property --hero-soft { syntax: "<number>"; inherits: true; initial-value: 60;  }
@property --hero-wght { syntax: "<number>"; inherits: true; initial-value: 400; }
@property --hero-wonk { syntax: "<number>"; inherits: true; initial-value: 0;   }
@property --vig-amt   { syntax: "<number>"; inherits: true; initial-value: 10;  }
@property --draw      { syntax: "<number>"; inherits: true; initial-value: 1;   }

:root{
  --paper:      #f2ebdd;
  --paper-deep: #e6d9bf;
  --paper-hi:   #faf5e9;
  --ink:        #1a140f;
  --ink-soft:   #3c2e22;
  --ink-mute:   #6b5a46;
  --sienna:     #b05633;
  --sienna-dk:  #883e1f;
  --moss:       #39462f;
  --gold:       #c89b3c;
  --rule:       #c7b48f;
  --rule-soft:  #d9c9a6;
}

html, body, #root { background: var(--paper); }

.flc1 { color: var(--ink); background: var(--paper); }
.flc1 .serif { font-family: 'Fraunces', 'Times New Roman', serif; font-variation-settings: "opsz" 144, "SOFT" 50; }
.flc1 .sans  { font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif; }
.flc1 .mono-ish { font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif; font-feature-settings: "tnum" 1, "cv11" 1; letter-spacing: .02em; }

/* ---------- paper grain + vignette ---------- */
.flc1 .grain{
  position: fixed; inset: 0; pointer-events:none; z-index: 60;
  mix-blend-mode: multiply; opacity:.14;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: drift 14s steps(6) infinite;
}
@keyframes drift{
  0%,100%{ transform: translate3d(0,0,0); }
  20%{ transform: translate3d(-2%,1%,0); }
  40%{ transform: translate3d(1%,-2%,0); }
  60%{ transform: translate3d(-1%,2%,0); }
  80%{ transform: translate3d(2%,-1%,0); }
}

.flc1 .vignette{
  position: fixed; inset: 0; pointer-events:none; z-index: 50;
  background: radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(26,20,15, calc(var(--vig-amt) / 100)) 100%);
}

/* ---------- rise (subtle) ---------- */
@keyframes rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
.flc1 .rise { animation: rise .95s cubic-bezier(.2,.75,.2,1) both; }

/* ---------- marquee top strip ---------- */
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.flc1 .marquee { animation: marquee 48s linear infinite; }

/* ---------- CTA: sheen + spring press ---------- */
@keyframes sheen { 0%{ background-position: -200% 0;} 100%{ background-position: 200% 0;} }
.flc1 .sheen {
  background-image: linear-gradient(100deg, transparent 30%, rgba(250,245,233,.28) 45%, rgba(250,245,233,.28) 55%, transparent 70%);
  background-size: 200% 100%;
  animation: sheen 3.6s ease-in-out infinite;
}
.flc1 .cta-spring {
  transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 420ms ease, filter 280ms ease;
  will-change: transform;
}
.flc1 .cta-spring:hover { transform: translateY(-3px) scale(1.012); filter: saturate(1.08); }
.flc1 .cta-spring:active { transform: translateY(0) scale(0.985); transition-duration: 120ms; }

/* ---------- video halo ---------- */
@keyframes halo { 0%{ box-shadow: 0 0 0 0 rgba(176,86,51,.5);} 100%{ box-shadow: 0 0 0 28px rgba(176,86,51,0);} }
.flc1 .halo { animation: halo 2.4s ease-out infinite; }

/* ---------- decorative rule with diamond ---------- */
.flc1 .rule-diamond { display:flex; align-items:center; gap: .75rem; }
.flc1 .rule-diamond .line{ flex:1; height:1px; background: var(--rule); }
.flc1 .rule-diamond .dia{ width:6px; height:6px; transform: rotate(45deg); background: var(--sienna); }

/* ---------- module row ---------- */
.flc1 .mod-row{ transition: background .45s ease; position: relative; }
.flc1 .mod-row:hover{ background: var(--paper-hi); }
.flc1 .mod-row:hover .mod-num .num-italic{ transform: translateX(0); opacity: 1; }
.flc1 .mod-row:hover .mod-num .num-roman{ opacity: 0; }

/* selection */
.flc1 ::selection{ background: var(--sienna); color: var(--paper-hi); }

/* ================================================================== */
/*   OVERDRIVE — Living Type                                          */
/* ================================================================== */

/* Each letter in the hero headline animates its variable-font axes
   from hard display (opsz 9, SOFT 0, wght 700, blur) to soft display
   (opsz 144, SOFT 60, wght 400, crisp) — "focusing in" as it settles. */
.flc1 .hero-headline .letter,
.flc1 .hero-headline .space {
  display: inline-block;
  white-space: pre;
}
.flc1 .hero-headline .space { width: .28em; }

@media (prefers-reduced-motion: no-preference) {
  .flc1 .hero-headline .letter {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(6px);
    --hero-opsz: 9;
    --hero-soft: 0;
    --hero-wght: 700;
    --hero-wonk: 0;
    font-variation-settings:
      "opsz" var(--hero-opsz),
      "SOFT" var(--hero-soft),
      "wght" var(--hero-wght),
      "WONK" var(--hero-wonk);
    animation: focusIn 1400ms cubic-bezier(.2,.7,.2,1) both;
  }
  .flc1 .hero-headline .letter.italic {
    font-style: italic;
  }
  @keyframes focusIn {
    0% {
      opacity: 0;
      transform: translateY(14px);
      filter: blur(6px);
      --hero-opsz: 9;
      --hero-soft: 0;
      --hero-wght: 700;
      --hero-wonk: 0;
    }
    55% {
      opacity: 1;
      filter: blur(0.6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
      --hero-opsz: 144;
      --hero-soft: 60;
      --hero-wght: 400;
      --hero-wonk: 1;
    }
  }
}

/* Gold underline — self-drawing SVG path under "língua dos cavalos".
   Draws AFTER the hero letters settle (delayed). */
.flc1 .underlined { position: relative; display: inline-block; }
.flc1 .underline-svg {
  position: absolute;
  left: -0.05em; right: -0.05em;
  bottom: -0.22em;
  width: calc(100% + 0.1em);
  height: 0.28em;
  overflow: visible;
  pointer-events: none;
}
.flc1 .underline-svg path {
  fill: none;
  stroke: var(--gold);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
@media (prefers-reduced-motion: no-preference) {
  .flc1 .underline-svg path {
    animation: drawUnderline 1400ms cubic-bezier(.6,.1,.2,1) 2100ms both;
  }
  @keyframes drawUnderline {
    from { stroke-dashoffset: 100; }
    to   { stroke-dashoffset: 0; }
  }
}
@media (prefers-reduced-motion: reduce) {
  .flc1 .underline-svg path { stroke-dashoffset: 0; }
}

/* Scroll-driven word-by-word reveal on section headlines (clip-path sweep). */
.flc1 .scroll-reveal {
  clip-path: inset(0 0 0 0);
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .flc1 .scroll-reveal {
      clip-path: inset(0 100% 0 0);
      animation: sweepIn linear both;
      animation-timeline: view();
      animation-range: entry 5% cover 45%;
    }
    @keyframes sweepIn {
      from { clip-path: inset(0 100% 0 0); }
      to   { clip-path: inset(0 0 0 0); }
    }
  }
}

/* Module numeral: roman → italic cross-fade as row enters the viewport. */
.flc1 .mod-num {
  position: relative;
  display: inline-block;
  line-height: 1;
  min-width: 1.6ch;
}
.flc1 .mod-num .num-roman,
.flc1 .mod-num .num-italic {
  display: inline-block;
  transition: opacity 450ms ease, transform 450ms cubic-bezier(.2,.7,.2,1);
}
.flc1 .mod-num .num-italic {
  position: absolute; left: 0; top: 0;
  font-style: italic;
  color: var(--sienna);
  opacity: 0;
  transform: translateX(-10px);
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .flc1 .mod-num .num-roman {
      animation: romanOut linear both;
      animation-timeline: view();
      animation-range: entry 20% cover 55%;
    }
    .flc1 .mod-num .num-italic {
      animation: italicIn linear both;
      animation-timeline: view();
      animation-range: entry 20% cover 55%;
    }
    @keyframes romanOut {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(6px); }
    }
    @keyframes italicIn {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  }
}

/* ================================================================== */
/*   OVERDRIVE — Scroll (the "A" concession)                          */
/* ================================================================== */

/* Oversized "flc1" stamp drifts opposite the scroll, gently rotating. */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .flc1 .flc-stamp {
      animation: stampDrift linear both;
      animation-timeline: scroll(root);
      animation-range: 0 90vh;
      will-change: transform;
    }
    @keyframes stampDrift {
      from { transform: translate3d(0, 0, 0) rotate(0deg); }
      to   { transform: translate3d(0, -90px, 0) rotate(-2.4deg); }
    }
  }
}

/* Vignette tightens / darkens as the page is read. */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .flc1 .vignette {
      animation: vigTighten linear both;
      animation-timeline: scroll(root);
      animation-range: 0 100vh;
    }
    @keyframes vigTighten {
      from { --vig-amt: 10; }
      to   { --vig-amt: 24; }
    }
  }
}

/* ================================================================== */
/*   OVERDRIVE — View Transitions (module row ↔ detail panel)         */
/* ================================================================== */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 520ms;
    animation-timing-function: cubic-bezier(.2,.7,.2,1);
  }
  ::view-transition-group(mod-expand) {
    animation-duration: 540ms;
    animation-timing-function: cubic-bezier(.2,.7,.2,1);
  }
}

.flc1 .mod-detail {
  overflow: hidden;
  border-top: 1px dashed var(--rule-soft);
  margin-top: 1.25rem;
  padding-top: 1.25rem;
}
.flc1 .mod-close {
  font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 10px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--ink-mute);
  transition: color 200ms ease;
  cursor: pointer;
  background: transparent;
  border: none;
}
.flc1 .mod-close:hover { color: var(--sienna); }
.flc1 .mod-toggle {
  font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 10px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--ink-mute);
  transition: color 200ms ease;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
}
.flc1 .mod-toggle:hover { color: var(--sienna-dk); }
.flc1 .mod-toggle .plus {
  width: 18px; height: 18px; border-radius: 9999px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--rule);
  transition: background 220ms ease, border-color 220ms ease, transform 300ms cubic-bezier(.2,.7,.2,1);
}
.flc1 .mod-toggle:hover .plus {
  background: var(--sienna);
  border-color: var(--sienna);
  color: var(--paper-hi);
  transform: rotate(90deg);
}

/* Reduced motion — also strip the grain drift and marquee for quiet. */
@media (prefers-reduced-motion: reduce) {
  .flc1 .grain, .flc1 .marquee, .flc1 .sheen, .flc1 .halo { animation: none !important; }
  .flc1 .rise { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Small atomic SVGs                                                  */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; style?: React.CSSProperties };

function HorseMark({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 52 C 18 40, 14 36, 14 30 C 14 22, 20 18, 24 16 C 22 13, 22 10, 25 9 C 27 11, 28 13, 30 14 C 36 12, 44 14, 48 20 C 52 26, 50 34, 46 40 L 46 52" />
        <path d="M26 20 C 28 22, 32 22, 34 20" />
        <circle cx="38" cy="24" r="1.2" fill="currentColor" />
        <path d="M24 16 L 22 11" />
      </g>
    </svg>
  );
}

function Shield({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2 L 20 5 V 11 C 20 16, 16 20, 12 22 C 8 20, 4 16, 4 11 V 5 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 12 L 11 14.5 L 15.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

function Lock({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10 V 7 a 4 4 0 0 1 8 0 V 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Sparkle({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2 L 13.5 10.5 L 22 12 L 13.5 13.5 L 12 22 L 10.5 13.5 L 2 12 L 10.5 10.5 Z" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Letter-by-letter renderer for the hero headline                    */
/* ------------------------------------------------------------------ */

/** Splits `text` into <span.letter> nodes with a per-letter animation-delay.
 *  `start` is the starting delay (ms) and the function returns the next start
 *  (so delays chain naturally across multiple Word calls). */
function renderLetters(text, startMs, step = 28, italic = false) {
  const nodes = [];
  let t = startMs;
  // Iterate by code point so accented characters (á, ú) stay intact.
  const chars = Array.from(text);
  chars.forEach((ch, i) => {
    if (ch === " ") {
      nodes.push(<span key={`s-${startMs}-${i}`} className="space" />);
    } else {
      nodes.push(
        <span
          key={`l-${startMs}-${i}`}
          className={`letter${italic ? " italic" : ""}`}
          style={{ animationDelay: `${t}ms` }}
        >
          {ch}
        </span>
      );
      t += step;
    }
  });
  return { nodes, end: t };
}

/* ------------------------------------------------------------------ */
/*  Section: top strip                                                 */
/* ------------------------------------------------------------------ */

function TopStrip() {
  const row = [
    "Aula gratuita destravada",
    "Método Fale a Língua do Cavalo",
    "Paolla Luchin · Comportamento Equino",
    "Acesso por 1 ano",
    "Garantia de 7 dias",
  ];
  const items = [...row, ...row];
  return (
    <div className="sans border-b" style={{ background: "var(--ink)", color: "var(--paper)", borderColor: "rgba(255,255,255,.08)" }}>
      <div className="overflow-hidden">
        <div className="marquee flex gap-10 whitespace-nowrap py-2.5 text-[11px] uppercase tracking-[.28em]">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 opacity-80">
              <span>{t}</span>
              <span style={{ color: "var(--sienna)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: masthead                                                  */
/* ------------------------------------------------------------------ */

function Masthead() {
  return (
    <header className="relative">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HorseMark className="w-8 h-8" style={{ color: "var(--ink)" }} />
          <div className="leading-tight">
            <div className="serif text-[22px] md:text-[24px]" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60", fontWeight: 500 }}>
              Paolla <span style={{ fontStyle: "italic" }}>Luchin</span>
            </div>
            <div className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>
              Comportamento Equino
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 sans text-[11px] uppercase tracking-[.28em]" style={{ color: "var(--ink-mute)" }}>
          <span>Vol. 01</span>
          <span style={{ color: "var(--rule)" }}>·</span>
          <span>Edição de Abril</span>
          <span style={{ color: "var(--rule)" }}>·</span>
          <span style={{ color: "var(--sienna)" }}>● Ao vivo hoje</span>
        </div>

        <div className="sans text-[10px] uppercase tracking-[.28em] px-3 py-1.5 border" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
          ⚠ Expira hoje
        </div>
      </div>
      <div className="h-px" style={{ background: "var(--rule)" }} />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — letter-choreographed headline + self-drawing underline      */
/* ------------------------------------------------------------------ */

function Hero() {
  // Letter delays chain across the phrase so the whole sentence reads like one breath.
  const step = 26;
  const startOffset = 260; // matches rise delay of the headline container
  let cursor = startOffset;

  // Piece 1: "Destrave a "
  const p1 = renderLetters("Destrave a ", cursor, step); cursor = p1.end + step * 1.2;
  // Piece 2 (italic + sienna): "habilidade única"
  const p2a = renderLetters("habilidade ", cursor, step, true); cursor = p2a.end;
  const p2b = renderLetters("única", cursor, step, true); cursor = p2b.end + step * 1.2;
  // Piece 3: " de falar a "
  const p3 = renderLetters(" de falar a ", cursor, step); cursor = p3.end + step * 1.2;
  // Piece 4 (underlined): "língua dos cavalos"
  const p4 = renderLetters("língua dos cavalos", cursor, step); cursor = p4.end;
  // Final punctuation
  const p5 = renderLetters(".", cursor, step); cursor = p5.end;

  return (
    <section className="relative overflow-hidden">
      {/* ambient ink blot bottom-right */}
      <div
        aria-hidden
        className="absolute -right-40 -bottom-40 w-[560px] h-[560px] rounded-full opacity-[.08] blur-2xl"
        style={{ background: "radial-gradient(closest-side, var(--sienna), transparent 70%)" }}
      />
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24 grid grid-cols-12 gap-6 relative">
        {/* marginalia */}
        <div className="col-span-12 md:col-span-1 sans text-[10px] uppercase tracking-[.3em] rise" style={{ color: "var(--ink-mute)", animationDelay: "0ms" }}>
          <div className="md:[writing-mode:vertical-rl] md:rotate-180">N.01 &nbsp;·&nbsp; Abertura</div>
        </div>

        {/* left: copy */}
        <div className="col-span-12 md:col-span-7 md:col-start-2">
          <div className="rise" style={{ animationDelay: "80ms" }}>
            <div className="rule-diamond mb-6 max-w-[320px]">
              <span className="dia" />
              <span className="line" />
              <span className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>Aula gratuita</span>
              <span className="line" />
            </div>
          </div>

          <p className="sans text-sm md:text-base leading-relaxed max-w-[560px] rise" style={{ color: "var(--ink-soft)", animationDelay: "160ms" }}>
            Você acabou de destravar uma <em>Aula Gratuita</em> com uma das maiores referências
            em comportamento equino do Brasil. Assista com atenção — do início ao fim.
          </p>

          <h1
            className="serif mt-8 hero-headline"
            style={{
              fontWeight: 400,
              fontSize: "clamp(44px, 7.2vw, 112px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            {p1.nodes}
            <span style={{ color: "var(--sienna-dk)" }}>
              {p2a.nodes}
              {p2b.nodes}
            </span>
            {p3.nodes}
            <span className="underlined">
              {p4.nodes}
              {/* Self-drawing underline — SVG stroke-dash animates after the letters settle. */}
              <svg className="underline-svg" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
                <path d="M 1 6 Q 25 2.5, 50 6 T 99 6" pathLength="100" />
              </svg>
            </span>
            {p5.nodes}
          </h1>

          <div className="mt-8 flex items-start gap-4 rise" style={{ animationDelay: "380ms" }}>
            <div className="h-[1px] w-10 mt-3" style={{ background: "var(--ink)" }} />
            <p className="sans text-[15px] md:text-[17px] leading-relaxed max-w-[540px]" style={{ color: "var(--ink-soft)" }}>
              Um método de comunicação comportamental equina construído ao longo de anos
              com cavalarianos, adestradores e tutores. Em poucas horas, você começa a
              <em> ler </em> o que o seu cavalo já vem dizendo.
            </p>
          </div>
        </div>

        {/* right: asymmetric stamp with scroll-parallax */}
        <aside className="col-span-12 md:col-span-3 md:col-start-10 flex md:justify-end">
          <div className="flc-stamp rise sans text-right" style={{ animationDelay: "500ms", color: "var(--ink-mute)" }}>
            <div className="serif text-[140px] md:text-[180px] leading-[0.8]" style={{ color: "var(--sienna)", fontStyle: "italic", fontWeight: 300 }}>
              fl
              <span style={{ color: "var(--ink)" }}>c</span>
              <span className="serif" style={{ fontStyle: "normal" }}>1</span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[.3em]">Fale a Língua</div>
            <div className="text-[10px] uppercase tracking-[.3em]">do Cavalo · Cap. 1</div>
            <div className="mt-4 text-[10px] uppercase tracking-[.3em]">por Paolla Luchin</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Video block                                                        */
/* ------------------------------------------------------------------ */

function VideoBlock() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-10">
        <div className="rise relative" style={{ animationDelay: "640ms" }}>
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{
              background: "linear-gradient(140deg, var(--ink) 0%, #2b1e14 70%, #3c2818 100%)",
              boxShadow: "0 40px 80px -30px rgba(26,20,15,.45), inset 0 0 0 1px rgba(255,255,255,.04)",
            }}
          >
            {/* verify: wire up the actual vturb player embed here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button type="button" aria-label="Assistir aula" className="relative group cta-spring">
                <span
                  className="halo w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center"
                  style={{ background: "var(--sienna)", color: "var(--paper-hi)" }}
                >
                  <Play className="w-9 h-9 md:w-10 md:h-10 translate-x-0.5" />
                </span>
              </button>
            </div>

            <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6 flex items-end justify-between gap-4">
              <div className="sans text-[11px] uppercase tracking-[.3em]" style={{ color: "rgba(242,235,221,.78)" }}>
                🔊 Ative o som antes de assistir
              </div>
              <div className="sans text-[11px] uppercase tracking-[.3em] text-right" style={{ color: "rgba(242,235,221,.78)" }}>
                Assista agora
              </div>
            </div>

            <Corner className="top-3 left-3" />
            <Corner className="top-3 right-3 rotate-90" />
            <Corner className="bottom-3 left-3 -rotate-90" />
            <Corner className="bottom-3 right-3 rotate-180" />
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sans text-[11px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>
            <span>Fig. 01 — Aula gratuita · Duração: assista do início ao fim</span>
            <span style={{ color: "var(--sienna-dk)" }}>🎁 Um presente especial será entregue a você</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Corner({ className = "" }) {
  return (
    <span className={`absolute w-5 h-5 ${className}`} aria-hidden>
      <span className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "rgba(242,235,221,.4)" }} />
      <span className="absolute top-0 left-0 h-full w-[1px]" style={{ background: "rgba(242,235,221,.4)" }} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Primary CTA + trust row                                            */
/* ------------------------------------------------------------------ */

function PrimaryCTA() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-10">
        <div className="flex flex-col items-center gap-5">
          <a
            href="#checkout"
            className="cta-spring relative inline-flex items-center gap-3 px-9 py-5 serif text-[22px] md:text-[26px] tracking-tight"
            style={{
              background: "var(--sienna)",
              color: "var(--paper-hi)",
              boxShadow: "0 22px 40px -18px rgba(136,62,31,.6), inset 0 0 0 1px rgba(250,245,233,.18)",
              fontWeight: 500,
            }}
          >
            <span className="absolute inset-0 sheen pointer-events-none" />
            <Sparkle className="w-5 h-5" style={{ color: "var(--paper-hi)" }} />
            <span className="relative">Quero garantir minha vaga agora</span>
            <Lock className="w-4 h-4 opacity-80" />
          </a>

          <div className="sans text-[11px] uppercase tracking-[.3em] flex items-center gap-2" style={{ color: "var(--ink-mute)" }}>
            <Lock className="w-3.5 h-3.5" />
            Pagamento 100% seguro · Kiwify
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustRow() {
  const items = [
    { icon: <Shield className="w-5 h-5" />, big: "7 dias", small: "Garantia incondicional" },
    { icon: <Sparkle className="w-5 h-5" />, big: "1 ano", small: "De acesso à plataforma" },
    { icon: <Play className="w-5 h-5" />, big: "+20h", small: "De conteúdo complementar" },
    { icon: <HorseMark className="w-5 h-5" />, big: "Teoria & prática", small: "Módulos aplicáveis" },
  ];
  return (
    <section style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--paper-deep)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-4">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
              style={{ background: "var(--paper-hi)", color: "var(--sienna-dk)", boxShadow: "inset 0 0 0 1px var(--rule)" }}
            >
              {it.icon}
            </span>
            <div className="leading-tight">
              <div className="serif text-[22px]" style={{ fontWeight: 500 }}>{it.big}</div>
              <div className="sans text-[11px] uppercase tracking-[.25em] mt-1" style={{ color: "var(--ink-mute)" }}>
                {it.small}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

function Testimonials() {
  // verify: names preserved from source; quotes are placeholders — swap with the real ones.
  const people = [
    { name: "Amanda Bacil",            role: "Tutora · Haras Ribeirão",  quote: "Comecei a reconhecer sinais que antes passavam completamente despercebidos.", initials: "AB" },
    { name: "Luciana Meguerditchian",  role: "Adestradora",              quote: "Mudou a forma como eu chego na baia. O cavalo sente a diferença no primeiro minuto.", initials: "LM" },
    { name: "Dany Baraldi",            role: "Cavalariana",              quote: "A aula sobre os cinco sentidos explicou anos de comportamento que eu não entendia.", initials: "DB" },
    { name: "Ana Castro",              role: "Tutora",                   quote: "É um método sólido, com base teórica real — não é achismo, é estudo aplicado.", initials: "AC" },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-1 sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>
          <div className="md:[writing-mode:vertical-rl] md:rotate-180">N.02 &nbsp;·&nbsp; Vozes</div>
        </div>

        <div className="col-span-12 md:col-span-11">
          <div className="rule-diamond mb-8 max-w-[420px]">
            <span className="dia" />
            <span className="line" />
            <span className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>Depoimentos</span>
            <span className="line" />
          </div>

          <h2 className="serif scroll-reveal text-[44px] md:text-[68px] leading-[0.95] max-w-[900px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            O que os alunos <span style={{ fontStyle: "italic", color: "var(--sienna-dk)" }}>estão dizendo</span>.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {people.map((p, i) => (
              <figure key={i} className="flex gap-5">
                <div
                  className="shrink-0 w-20 h-20 rounded-full flex items-center justify-center serif text-[26px]"
                  style={{
                    background: "var(--paper-hi)",
                    color: "var(--sienna-dk)",
                    boxShadow: "inset 0 0 0 1px var(--rule), 0 12px 24px -16px rgba(26,20,15,.35)",
                    fontStyle: "italic",
                  }}
                  aria-hidden
                >
                  {p.initials}
                </div>
                <div>
                  <blockquote className="serif text-[22px] md:text-[26px] leading-[1.25]" style={{ fontWeight: 400 }}>
                    <span style={{ color: "var(--sienna)" }}>“</span>
                    {p.quote}
                    <span style={{ color: "var(--sienna)" }}>”</span>
                  </blockquote>
                  <figcaption className="mt-3 sans text-[11px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>
                    {p.name} <span style={{ color: "var(--rule)" }}>·</span> {p.role}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Modules — with View Transitions on expand                          */
/* ------------------------------------------------------------------ */

function Modules() {
  // verify: module titles and details are Portuguese reconstructions.
  //         Replace with canonical copy from the source page.
  const mods = [
    {
      n: "01",
      t: "Comportamento & Influência",
      d: "Como o cavalo percebe o mundo e como sua presença altera o comportamento dele antes mesmo de você tocá-lo.",
      bullets: ["Percepção do ambiente", "Gatilhos de stress e conforto", "Influência não-verbal do tutor"],
    },
    {
      n: "02",
      t: "Relações & Liderança",
      d: "A construção de uma liderança serena, clara e justa — o oposto da dominação. O cavalo escolhe seguir.",
      bullets: ["Liderança sem coerção", "Dinâmica de manada", "Confiança mútua e consistência"],
    },
    {
      n: "03",
      t: "Os cinco sentidos",
      d: "Visão, audição, olfato, tato e paladar: como cada sentido molda a reação do cavalo em cada interação.",
      bullets: ["Campo visual e pontos cegos", "Audição direcional", "O papel subestimado do olfato"],
    },
    {
      n: "04",
      t: "Como o cavalo aprende",
      d: "Reforço, timing e repetição com base em etologia aplicada — o que funciona e o que apenas confunde o animal.",
      bullets: ["Reforço positivo e negativo", "Janelas de aprendizado", "Erros comuns de timing"],
    },
    {
      n: "05",
      t: "Linguagem corporal & leitura emocional",
      d: "Ler o corpo do cavalo em tempo real: tensão, relaxamento, hesitação, disposição.",
      bullets: ["Micro-sinais de tensão", "Postura de orelhas e cauda", "Leitura contextual da baia ao piquete"],
    },
    {
      n: "06",
      t: "Bônus · +20h de conteúdo",
      d: "Um acervo de aulas complementares, estudos de caso e materiais de apoio para aprofundar o método.",
      bullets: ["Estudos de caso reais", "Material de apoio imprimível", "Aulas extras de aprofundamento"],
    },
  ];

  const [expanded, setExpanded] = useState(null);
  // Row that should carry the view-transition-name through the transition.
  // We set it BEFORE startViewTransition so the old snapshot has the name,
  // and clear it AFTER the transition finishes so the new snapshot does too
  // (by way of the expanded-state persisting the name — see row style below).
  const [txIdx, setTxIdx] = useState(null);

  const toggle = useCallback((idx) => {
    const next = expanded === idx ? null : idx;
    if (typeof document !== "undefined" && document.startViewTransition) {
      // Apply the name to the row being toggled (old snapshot will carry it).
      flushSync(() => setTxIdx(idx));
      const t = document.startViewTransition(() => {
        flushSync(() => setExpanded(next));
      });
      t.finished.finally(() => setTxIdx(null));
    } else {
      setExpanded(next);
    }
  }, [expanded]);

  return (
    <section style={{ background: "var(--paper-hi)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-1 sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>
          <div className="md:[writing-mode:vertical-rl] md:rotate-180">N.03 &nbsp;·&nbsp; Programa</div>
        </div>

        <div className="col-span-12 md:col-span-11">
          <div className="rule-diamond mb-8 max-w-[420px]">
            <span className="dia" />
            <span className="line" />
            <span className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--ink-mute)" }}>Os seis módulos</span>
            <span className="line" />
          </div>

          <h2 className="serif scroll-reveal text-[44px] md:text-[68px] leading-[0.95] max-w-[980px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            Um currículo pensado para quem quer ir{" "}
            <span style={{ fontStyle: "italic", color: "var(--sienna-dk)" }}>além da superfície</span>.
          </h2>

          <ul className="mt-14 border-t" style={{ borderColor: "var(--rule-soft)" }}>
            {mods.map((m, idx) => {
              const isOpen = expanded === idx;
              return (
                <li
                  key={m.n}
                  className="mod-row grid grid-cols-12 gap-4 md:gap-8 items-start py-8 md:py-10 px-2 border-b"
                  style={{
                    borderColor: "var(--rule-soft)",
                    // Name applied when: the row is being toggled right now (txIdx),
                    // OR it's the currently-expanded row (so the name survives in the new snapshot).
                    viewTransitionName: txIdx === idx || isOpen ? "mod-expand" : undefined,
                  }}
                >
                  <div className="col-span-2 md:col-span-1">
                    <div
                      className="mod-num serif text-[46px] md:text-[64px] leading-none"
                      style={{ color: "var(--ink-mute)", fontWeight: 300 }}
                    >
                      <span className="num-roman">{m.n}</span>
                      <span className="num-italic">{m.n}</span>
                    </div>
                  </div>
                  <div className="col-span-10 md:col-span-6">
                    <div className="sans text-[10px] uppercase tracking-[.3em] mb-2" style={{ color: "var(--ink-mute)" }}>
                      Módulo {m.n}
                    </div>
                    <h3 className="serif text-[28px] md:text-[38px] leading-[1.05]" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {m.t}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="sans text-[15px] md:text-[17px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {m.d}
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="mod-toggle"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="plus" aria-hidden>
                          <svg viewBox="0 0 16 16" className="w-2.5 h-2.5">
                            <path d={isOpen ? "M4 8 H12" : "M4 8 H12 M8 4 V12"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </span>
                        {isOpen ? "Recolher módulo" : "Explorar módulo"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mod-detail">
                        <div className="sans text-[10px] uppercase tracking-[.3em] mb-3" style={{ color: "var(--ink-mute)" }}>
                          Tópicos desta seção
                        </div>
                        <ul className="space-y-2 sans text-[15px]" style={{ color: "var(--ink-soft)" }}>
                          {m.bullets.map((b, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0" style={{ background: "var(--sienna)", transform: "rotate(45deg)" }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5">
                          <button type="button" className="mod-close" onClick={() => toggle(idx)}>
                            × &nbsp; Fechar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Offer / pricing                                                    */
/* ------------------------------------------------------------------ */

function Offer() {
  return (
    <section id="checkout" className="relative" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: "radial-gradient(1200px 500px at 50% 0%, rgba(176,86,51,.35), transparent 60%)" }} />
      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10 py-24 md:py-32 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-1 sans text-[10px] uppercase tracking-[.3em]" style={{ color: "rgba(242,235,221,.55)" }}>
          <div className="md:[writing-mode:vertical-rl] md:rotate-180">N.04 &nbsp;·&nbsp; Inscrição</div>
        </div>

        <div className="col-span-12 md:col-span-11">
          <div className="rule-diamond mb-8 max-w-[360px]">
            <span className="dia" style={{ background: "var(--gold)" }} />
            <span className="line" style={{ background: "rgba(199,180,143,.35)" }} />
            <span className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "rgba(242,235,221,.65)" }}>
              Sua vaga
            </span>
            <span className="line" style={{ background: "rgba(199,180,143,.35)" }} />
          </div>

          <h2 className="serif scroll-reveal text-[44px] md:text-[72px] leading-[0.95] max-w-[980px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            Entre para o <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Entenda Seu Cavalo</span>.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <div className="sans text-[11px] uppercase tracking-[.3em] mb-3" style={{ color: "rgba(242,235,221,.55)" }}>
                Investimento
              </div>
              <div className="flex items-baseline gap-4 flex-wrap">
                <div className="serif text-[44px] md:text-[60px] leading-none" style={{ fontWeight: 400 }}>
                  12<span style={{ fontStyle: "italic", color: "var(--gold)" }}>x</span>
                </div>
                <div className="serif text-[72px] md:text-[112px] leading-none" style={{ fontWeight: 500, letterSpacing: "-0.03em" }}>
                  R$ 20,<span style={{ fontSize: ".55em", verticalAlign: "top", letterSpacing: 0 }}>37</span>
                </div>
              </div>
              <div className="mt-4 sans text-[13px]" style={{ color: "rgba(242,235,221,.7)" }}>
                Ou <span style={{ color: "var(--paper-hi)", fontWeight: 500 }}>R$ 197,00 à vista</span> · Pix, Boleto ou Cartão em até 12×
              </div>

              <div className="mt-10 flex flex-col items-start gap-4">
                <a
                  href="#"
                  className="cta-spring group relative inline-flex items-center gap-3 px-9 py-5 serif text-[22px] md:text-[26px]"
                  style={{
                    background: "var(--gold)",
                    color: "var(--ink)",
                    boxShadow: "0 22px 40px -18px rgba(200,155,60,.55), inset 0 0 0 1px rgba(26,20,15,.1)",
                    fontWeight: 500,
                  }}
                >
                  <span className="absolute inset-0 sheen pointer-events-none" />
                  <Sparkle className="w-5 h-5" />
                  <span className="relative">Quero garantir minha vaga agora</span>
                  <Lock className="w-4 h-4 opacity-80" />
                </a>
                <div className="sans text-[11px] uppercase tracking-[.3em] flex items-center gap-2" style={{ color: "rgba(242,235,221,.6)" }}>
                  <Lock className="w-3.5 h-3.5" /> Checkout seguro · Kiwify
                </div>
              </div>
            </div>

            <aside className="md:col-span-5">
              <div
                className="p-8 md:p-10"
                style={{
                  border: "1px solid rgba(242,235,221,.15)",
                  background: "linear-gradient(180deg, rgba(242,235,221,.04), rgba(242,235,221,0))",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6" style={{ color: "var(--gold)" }} />
                  <div className="sans text-[10px] uppercase tracking-[.3em]" style={{ color: "rgba(242,235,221,.7)" }}>
                    Garantia de 7 dias
                  </div>
                </div>
                <p className="serif text-[20px] md:text-[22px] leading-[1.3]" style={{ fontStyle: "italic", fontWeight: 400 }}>
                  Entre, assista, aplique. Se em sete dias o método não fizer sentido para você e o seu
                  cavalo, devolvemos 100% do seu investimento — sem perguntas.
                </p>
                <ul className="mt-8 space-y-3 sans text-[14px]" style={{ color: "rgba(242,235,221,.8)" }}>
                  <li className="flex items-start gap-3"><span style={{ color: "var(--gold)" }}>✦</span> Acesso por 1 ano à plataforma</li>
                  <li className="flex items-start gap-3"><span style={{ color: "var(--gold)" }}>✦</span> Mais de 20h de conteúdo complementar</li>
                  <li className="flex items-start gap-3"><span style={{ color: "var(--gold)" }}>✦</span> Módulos teóricos e práticos</li>
                  <li className="flex items-start gap-3"><span style={{ color: "var(--gold)" }}>✦</span> Pix · Boleto · Cartão em 12×</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer style={{ background: "var(--paper-deep)", borderTop: "1px solid var(--rule)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-14 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-6 flex items-center gap-4">
          <HorseMark className="w-10 h-10" style={{ color: "var(--ink)" }} />
          <div>
            <div className="serif text-[28px] leading-none" style={{ fontWeight: 500 }}>
              Paolla <span style={{ fontStyle: "italic" }}>Luchin</span>
            </div>
            <div className="sans text-[10px] uppercase tracking-[.3em] mt-1" style={{ color: "var(--ink-mute)" }}>
              Comportamento Equino
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 sans text-[11px] uppercase tracking-[.28em] md:text-right" style={{ color: "var(--ink-mute)" }}>
          © Paolla Luchin <span style={{ color: "var(--rule)" }}>·</span> Todos os direitos reservados <span style={{ color: "var(--rule)" }}>·</span> Comportamento Equino
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

export default function FLC1() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`flc1 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ transition: "opacity 600ms ease" }}>
      <style>{STYLE}</style>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      <TopStrip />
      <Masthead />
      <Hero />
      <VideoBlock />
      <PrimaryCTA />
      <TrustRow />
      <Testimonials />
      <Modules />
      <Offer />
      <Footer />
    </div>
  );
}
