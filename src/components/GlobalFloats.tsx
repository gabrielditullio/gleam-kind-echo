import { useEffect, useState } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";

const GlobalFloats = () => {
  const [scrolled, setScrolled] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch sticky CTA visibility by checking if #cta is out of view
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
      {/* WhatsApp float — hide when sticky bar is visible */}
      {!stickyVisible && (
        <a
          href="#whatsapp"
          className="fixed z-[9997] right-5 bottom-20 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          <MessageCircle size={28} className="text-white" />
        </a>
      )}

      {/* Back to top */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed z-[9997] right-5 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-100 cursor-pointer"
          style={{
            width: 40, height: 40,
            bottom: stickyVisible ? 80 : 148,
            background: "rgba(45,27,61,0.8)",
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
