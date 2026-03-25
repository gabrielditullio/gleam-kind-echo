import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const GlobalFloats = () => {
  const [scrolled, setScrolled] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("cta");
    if (!target) return;
    const obs = new IntersectionObserver(
      ([e]) => setStickyVisible(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <a
        href="https://wa.me/556196637383?text=Ol%C3%A1%2C%20vim%20da%20p%C3%A1gina%20da%20forma%C3%A7%C3%A3o%20doma%20e%20estou%20com%20d%C3%BAvidas"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[9997] right-5 bottom-20 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(42,21,48,0.15)" }}
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8 object-contain" />
      </a>

      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed z-[9997] right-5 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-100 cursor-pointer"
          style={{
            width: 40, height: 40,
            bottom: stickyVisible ? 80 : 148,
            background: "rgba(42,21,48,0.8)",
            opacity: 0.7,
          }}
        >
          <ChevronUp size={20} className="text-white" />
        </button>
      )}
    </>
  );
};

export default GlobalFloats;
