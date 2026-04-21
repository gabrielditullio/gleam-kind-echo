import { useEffect, useState } from "react";

/**
 * FLC1 — Paolla Luchin · Comportamento Equino
 * Editorial / organic-paper direction.
 *
 * Content is preserved from the original page at paollaluchin.com.br/flc1/
 * where returned verbatim by fetch. Items marked `// verify:` are reconstructions
 * (module titles, placeholder testimonial blurbs, video embed) that should be
 * replaced with the canonical copy / assets before shipping.
 */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');

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

/* grain overlay — subtle paper tooth */
.flc1 .grain{ position: fixed; inset: 0; pointer-events:none; z-index: 60; mix-blend-mode: multiply; opacity:.14; background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"); animation: drift 14s steps(6) infinite; }
@keyframes drift{
  0%,100%{ transform: translate3d(0,0,0); }
  20%{ transform: translate3d(-2%,1%,0); }
  40%{ transform: translate3d(1%,-2%,0); }
  60%{ transform: translate3d(-1%,2%,0); }
  80%{ transform: translate3d(2%,-1%,0); }
}

/* vignette at page edges */
.flc1 .vignette{ position: fixed; inset: 0; pointer-events:none; z-index: 50; background: radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(26,20,15,.10) 100%); }

/* staggered rise */
@keyframes rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
.flc1 .rise { animation: rise .95s cubic-bezier(.2,.75,.2,1) both; }

/* marquee hairline slide */
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.flc1 .marquee { animation: marquee 48s linear infinite; }

/* soft pulse on video play button */
@keyframes halo { 0%{ box-shadow: 0 0 0 0 rgba(176,86,51,.5);} 100%{ box-shadow: 0 0 0 28px rgba(176,86,51,0);} }
.flc1 .halo { animation: halo 2.4s ease-out infinite; }

/* CTA shimmer */
@keyframes sheen { 0%{ background-position: -200% 0;} 100%{ background-position: 200% 0;} }
.flc1 .sheen {
  background-image: linear-gradient(100deg, transparent 30%, rgba(250,245,233,.28) 45%, rgba(250,245,233,.28) 55%, transparent 70%);
  background-size: 200% 100%;
  animation: sheen 3.6s ease-in-out infinite;
}

/* decorative rule with diamond */
.flc1 .rule-diamond { display:flex; align-items:center; gap: .75rem; }
.flc1 .rule-diamond .line{ flex:1; height:1px; background: var(--rule); }
.flc1 .rule-diamond .dia{ width:6px; height:6px; transform: rotate(45deg); background: var(--sienna); }

/* module row */
.flc1 .mod-row{ transition: background .45s ease, padding .45s ease; }
.flc1 .mod-row:hover{ background: var(--paper-hi); }
.flc1 .mod-row:hover .mod-num{ color: var(--sienna); }

/* selection */
.flc1 ::selection{ background: var(--sienna); color: var(--paper-hi); }
`;

/* ------------------------------------------------------------------ */
/*  Small atomic SVGs                                                  */
/* ------------------------------------------------------------------ */

function HorseMark({ className = "" }) {
  // tiny emblem — stylized horse head
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 52 C 18 40, 14 36, 14 30 C 14 22, 20 18, 24 16 C 22 13, 22 10, 25 9 C 27 11, 28 13, 30 14 C 36 12, 44 14, 48 20 C 52 26, 50 34, 46 40 L 46 52" />
        <path d="M26 20 C 28 22, 32 22, 34 20" />
        <circle cx="38" cy="24" r="1.2" fill="currentColor" />
        <path d="M24 16 L 22 11" />
      </g>
    </svg>
  );
}

function Shield({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 L 20 5 V 11 C 20 16, 16 20, 12 22 C 8 20, 4 16, 4 11 V 5 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 12 L 11 14.5 L 15.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Play({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 5 V 19 L 19 12 Z" fill="currentColor" />
    </svg>
  );
}

function Lock({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10 V 7 a 4 4 0 0 1 8 0 V 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 L 13.5 10.5 L 22 12 L 13.5 13.5 L 12 22 L 10.5 13.5 L 2 12 L 10.5 10.5 Z" fill="currentColor" />
    </svg>
  );
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
  // doubled for seamless marquee
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
/*  Section: hero                                                      */
/* ------------------------------------------------------------------ */

function Hero() {
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
            className="serif mt-8 rise"
            style={{
              fontWeight: 400,
              fontSize: "clamp(44px, 7.2vw, 112px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              animationDelay: "260ms",
            }}
          >
            Destrave a{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--sienna-dk)" }}>
              habilidade única
            </span>{" "}
            de falar a{" "}
            <span style={{ textDecoration: "underline", textDecorationThickness: "2px", textDecorationColor: "var(--gold)", textUnderlineOffset: "10px" }}>
              língua dos cavalos
            </span>
            .
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

        {/* right: asymmetric stamp */}
        <aside className="col-span-12 md:col-span-3 md:col-start-10 flex md:justify-end">
          <div className="rise sans text-right" style={{ animationDelay: "500ms", color: "var(--ink-mute)" }}>
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
/*  Section: video                                                     */
/* ------------------------------------------------------------------ */

function VideoBlock() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-10">
        <div className="rise relative" style={{ animationDelay: "640ms" }}>
          {/* outer mat */}
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{
              background: "linear-gradient(140deg, var(--ink) 0%, #2b1e14 70%, #3c2818 100%)",
              boxShadow: "0 40px 80px -30px rgba(26,20,15,.45), inset 0 0 0 1px rgba(255,255,255,.04)",
            }}
          >
            {/* video placeholder // verify: wire up vturb / actual player embed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Assistir aula"
                className="relative group"
              >
                <span
                  className="halo w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition"
                  style={{ background: "var(--sienna)", color: "var(--paper-hi)" }}
                >
                  <Play className="w-9 h-9 md:w-10 md:h-10 translate-x-0.5" />
                </span>
              </button>
            </div>

            {/* bottom overlay instructions */}
            <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6 flex items-end justify-between gap-4">
              <div className="sans text-[11px] uppercase tracking-[.3em]" style={{ color: "rgba(242,235,221,.78)" }}>
                🔊 Ative o som antes de assistir
              </div>
              <div className="sans text-[11px] uppercase tracking-[.3em] text-right" style={{ color: "rgba(242,235,221,.78)" }}>
                Assista agora
              </div>
            </div>

            {/* decorative corners */}
            <Corner className="top-3 left-3" />
            <Corner className="top-3 right-3 rotate-90" />
            <Corner className="bottom-3 left-3 -rotate-90" />
            <Corner className="bottom-3 right-3 rotate-180" />
          </div>

          {/* caption */}
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
/*  Section: primary CTA + trust row                                   */
/* ------------------------------------------------------------------ */

function PrimaryCTA() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-10">
        <div className="flex flex-col items-center gap-5">
          <a
            href="#checkout"
            className="relative inline-flex items-center gap-3 px-9 py-5 serif text-[22px] md:text-[26px] tracking-tight transition hover:-translate-y-0.5"
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
/*  Section: testimonials                                              */
/* ------------------------------------------------------------------ */

function Testimonials() {
  // verify: original page has four student image cards — names below are from source.
  // Quotes are placeholders and must be replaced with the real testimonial copy.
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

          <h2 className="serif text-[44px] md:text-[68px] leading-[0.95] max-w-[900px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            O que os alunos <span style={{ fontStyle: "italic", color: "var(--sienna-dk)" }}>estão dizendo</span>.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {people.map((p, i) => (
              <figure key={i} className="flex gap-5">
                {/* initial medallion stands in for the student photo */}
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
/*  Section: modules                                                   */
/* ------------------------------------------------------------------ */

function Modules() {
  // verify: module titles below are Portuguese reconstructions of the
  // English summaries returned by fetch. Replace with the canonical copy.
  const mods = [
    { n: "01", t: "Comportamento & Influência", d: "Como o cavalo percebe o mundo e como sua presença altera o comportamento dele antes mesmo de você tocá-lo." },
    { n: "02", t: "Relações & Liderança",        d: "A construção de uma liderança serena, clara e justa — o oposto da dominação. O cavalo escolhe seguir." },
    { n: "03", t: "Os cinco sentidos",           d: "Visão, audição, olfato, tato e paladar: como cada sentido molda a reação do cavalo em cada interação." },
    { n: "04", t: "Como o cavalo aprende",       d: "Reforço, timing e repetição com base em etologia aplicada — o que funciona e o que apenas confunde o animal." },
    { n: "05", t: "Linguagem corporal & leitura emocional", d: "Ler o corpo do cavalo em tempo real: tensão, relaxamento, hesitação, disposição." },
    { n: "06", t: "Bônus · +20h de conteúdo",    d: "Um acervo de aulas complementares, estudos de caso e materiais de apoio para aprofundar o método." },
  ];

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

          <h2 className="serif text-[44px] md:text-[68px] leading-[0.95] max-w-[980px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            Um currículo pensado para quem quer ir{" "}
            <span style={{ fontStyle: "italic", color: "var(--sienna-dk)" }}>além da superfície</span>.
          </h2>

          <ul className="mt-14 border-t" style={{ borderColor: "var(--rule-soft)" }}>
            {mods.map((m) => (
              <li
                key={m.n}
                className="mod-row grid grid-cols-12 gap-4 md:gap-8 items-start py-8 md:py-10 px-2 border-b"
                style={{ borderColor: "var(--rule-soft)" }}
              >
                <div className="col-span-2 md:col-span-1">
                  <div
                    className="mod-num serif text-[46px] md:text-[64px] leading-none transition-colors"
                    style={{ color: "var(--ink-mute)", fontStyle: "italic", fontWeight: 300 }}
                  >
                    {m.n}
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: offer / pricing                                           */
/* ------------------------------------------------------------------ */

function Offer() {
  return (
    <section id="checkout" className="relative" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      {/* decorative frame */}
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

          <h2 className="serif text-[44px] md:text-[72px] leading-[0.95] max-w-[980px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
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
                  className="group relative inline-flex items-center gap-3 px-9 py-5 serif text-[22px] md:text-[26px] transition hover:-translate-y-0.5"
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
/*  Section: footer                                                    */
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
