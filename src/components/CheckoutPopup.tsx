import { useState, useEffect, FormEvent } from "react";
import { X } from "lucide-react";

// ============================================================
// CheckoutPopup — lead capture modal (multi-funnel version)
// DevForge | 2026-04-21
//
// Accepts optional props so the same component can serve Doma
// AND FLC without a single-line change to Doma's call site.
// All new props fall back to Doma defaults.
// ============================================================

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  /** Funnel identifier — goes to GAS + dataLayer for segmentation */
  source?: string;
  /** Product slug — goes to GAS */
  product?: string;
  /** Kiwify checkout ID (the part after pay.kiwify.com.br/) */
  kiwifyCheckoutId?: string;
  /** Lead value fired in InitiateCheckout events */
  leadValue?: number;
  /** Heading shown at the top of the modal */
  headline?: string;
  /** Subtext under the heading */
  subheadline?: string;
  /** Submit button label when not submitting */
  ctaLabel?: string;
}

const DOMA_DEFAULTS = {
  source: "doma",
  product: "formacao-doma",
  kiwifyCheckoutId: "DzaXdxY",
  leadValue: 1497.0,
  headline: "Complete seus dados para garantir sua vaga",
  subheadline: "Você será redirecionado para o checkout seguro",
  ctaLabel: "Entrar na Formação Doma",
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
];

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwnww7tmI4svmJW6kAeoSIZmKPl3dqYUJ0mXne7E0f2uZu6FqkgNF9R4LLuJHOO-HZN5w/exec";

function getUtms() {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });
  return utms;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const CheckoutPopup = ({
  isOpen,
  onClose,
  source = DOMA_DEFAULTS.source,
  product = DOMA_DEFAULTS.product,
  kiwifyCheckoutId = DOMA_DEFAULTS.kiwifyCheckoutId,
  leadValue = DOMA_DEFAULTS.leadValue,
  headline = DOMA_DEFAULTS.headline,
  subheadline = DOMA_DEFAULTS.subheadline,
  ctaLabel = DOMA_DEFAULTS.ctaLabel,
}: CheckoutPopupProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const phoneDigits = telefone.replace(/\D/g, "");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValid =
    nome.trim().length >= 3 && emailValid && phoneDigits.length >= 10;

  function validate() {
    const e: Record<string, string> = {};
    if (nome.trim().length < 3) e.nome = "Nome deve ter no mínimo 3 caracteres";
    if (!emailValid) e.email = "Email inválido";
    if (phoneDigits.length < 10)
      e.telefone = "Telefone deve ter no mínimo 10 dígitos";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const utms = getUtms();
    const formData = {
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    };

    // Fire-and-forget to GAS. no-cors means we can't read the response,
    // but the Sheet + Datacrazy dispatch happens server-side regardless.
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          utm_source: utms.utm_source || "",
          utm_medium: utms.utm_medium || "",
          utm_campaign: utms.utm_campaign || "",
          utm_content: utms.utm_content || "",
          utm_term: utms.utm_term || "",
          utm_id: utms.utm_id || "",
          fbclid: utms.fbclid || "",
          gclid: utms.gclid || "",
          pagina: window.location.href,
          timestamp: new Date().toISOString(),
          // New fields — explicitly sent so GAS doesn't have to fall back
          source: source,
          product: product,
          raw_url: window.location.href,
        }),
      });
    } catch {
      /* silent */
    }

    // Notify parent WP window (GTM lives there)
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "checkout_lead",
          lead: formData,
          utms,
          source: source,
          product: product,
          value: leadValue,
        },
        "*"
      );
    }

    // Build Kiwify checkout URL with prefilled fields + UTMs passed through
    const checkoutURL = new URL(
      `https://pay.kiwify.com.br/${kiwifyCheckoutId}`
    );
    checkoutURL.searchParams.set("name", formData.nome);
    checkoutURL.searchParams.set("email", formData.email);
    checkoutURL.searchParams.set(
      "phone",
      formData.telefone.replace(/\D/g, "")
    );
    Object.keys(utms).forEach((key) => {
      checkoutURL.searchParams.set(key, utms[key]);
    });

    // 500ms grace period — lets postMessage/fetch dispatch before navigation
    setTimeout(() => {
      window.top!.location.href = checkoutURL.toString();
    }, 500);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(42,21,48,0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-[90vw] rounded-[12px] p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300"
        style={{
          maxWidth: 480,
          background: "#2A1530",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <h3 className="font-display font-bold text-[22px] md:text-[26px] text-neutral-50 text-center mb-1">
          {headline}
        </h3>
        <p className="font-body text-[14px] text-neutral-400 text-center mb-6">
          {subheadline}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body font-medium text-[13px] text-white/70 mb-1 block">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-[8px] px-4 py-3 font-body text-[15px] text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-sand transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
            {errors.nome && (
              <p className="font-body text-[12px] text-coral-dark mt-1">
                {errors.nome}
              </p>
            )}
          </div>

          <div>
            <label className="font-body font-medium text-[13px] text-white/70 mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-[8px] px-4 py-3 font-body text-[15px] text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-sand transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
            {errors.email && (
              <p className="font-body text-[12px] text-coral-dark mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="font-body font-medium text-[13px] text-white/70 mb-1 block">
              Telefone
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className="w-full rounded-[8px] px-4 py-3 font-body text-[15px] text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-sand transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
            {errors.telefone && (
              <p className="font-body text-[12px] text-coral-dark mt-1">
                {errors.telefone}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="group relative w-full flex items-center justify-center gap-2 bg-coral text-white font-body font-semibold text-[15px] uppercase tracking-[0.05em] py-4 rounded-[8px] transition-all duration-150 hover:bg-coral-dark disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed overflow-hidden mt-2"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              {submitting ? "Redirecionando..." : ctaLabel}
              <span className="inline-block transition-transform duration-150 ease-in-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPopup;
