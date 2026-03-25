import whatsappIcon from "@/assets/whatsapp-icon.png";

const SectionWhatsapp = () => (
  <section>
    <div className="bg-neutral-50 py-section-mobile md:py-section-desktop">
      <div className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: 600 }}>
        <h2 className="font-display font-bold text-[28px] text-plum-dark">
          Ficou com alguma dúvida?
        </h2>
        <p className="font-body text-[16px] text-neutral-800 mt-3 leading-relaxed">
          Fale com a minha equipe pelo WhatsApp e tire suas dúvidas sobre a Formação em Doma Comportamental.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href="https://wa.me/556196637383?text=Ol%C3%A1%2C%20vim%20da%20p%C3%A1gina%20da%20forma%C3%A7%C3%A3o%20doma%20e%20estou%20com%20d%C3%BAvidas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 font-body font-semibold text-[15px] text-white uppercase tracking-[0.05em] px-8 py-4 rounded-[8px] transition-all duration-150 hover:brightness-90"
            style={{ background: "#25D366", maxWidth: 400, width: "100%" }}
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
            Tirar dúvidas por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default SectionWhatsapp;
