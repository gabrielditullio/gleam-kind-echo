import TopBar from "@/components/TopBar";
import SectionHero from "@/components/SectionHero";
import SectionBadges from "@/components/SectionBadges";
import SectionProblema from "@/components/SectionProblema";
import SectionComoFunciona from "@/components/SectionComoFunciona";
import SectionDepoimentos from "@/components/SectionDepoimentos";
import SectionParaQuem from "@/components/SectionParaQuem";
import SectionModulos from "@/components/SectionModulos";
import SectionBonus from "@/components/SectionBonus";
import SectionBio from "@/components/SectionBio";
import SectionPassos from "@/components/SectionPassos";
import SectionAncoragem from "@/components/SectionAncoragem";
import SectionOferta from "@/components/SectionOferta";
import SectionGarantia from "@/components/SectionGarantia";
import SectionFaq from "@/components/SectionFaq";
import SectionWhatsapp from "@/components/SectionWhatsapp";
import SectionFechamento from "@/components/SectionFechamento";
import SectionDivider from "@/components/SectionDivider";
import SectionTransition from "@/components/SectionTransition";
import StickyCta from "@/components/StickyCta";
import GlobalFloats from "@/components/GlobalFloats";
import CheckoutPopup from "@/components/CheckoutPopup";
import { CheckoutProvider, useCheckout } from "@/contexts/CheckoutContext";

const IndexContent = () => {
  const { isOpen, closeCheckout } = useCheckout();

  return (
    <div className="font-body text-neutral-800">
      <TopBar />
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
        {/* Hero (dark) → Badges (light) */}
        <SectionTransition from="dark" to="light" />
        <SectionBadges />
        {/* Badges (light) → Problema (light) */}
        <SectionDivider light />
        <SectionProblema />
        {/* Problema (light) → ComoFunciona (dark) */}
        <SectionTransition from="light" to="dark" />
        <SectionComoFunciona />
        {/* ComoFunciona (dark) → Depoimentos (light) */}
        <SectionTransition from="dark" to="light" />
        <SectionDepoimentos />
        {/* Depoimentos (light) → ParaQuem (dark) */}
        <SectionTransition from="light" to="dark" />
        <SectionParaQuem />
        {/* ParaQuem (dark) → Modulos (light) */}
        <SectionTransition from="dark" to="light" />
        <SectionModulos />
        {/* Modulos (light) → Bonus (light) */}
        <SectionDivider light />
        <SectionBonus />
        {/* Bonus (light) → Bio (light) */}
        <SectionDivider light />
        <SectionBio />
        {/* Bio (light) → Passos (dark) */}
        <SectionTransition from="light" to="dark" />
        <SectionPassos />
        {/* Passos (dark) → Ancoragem (dark) */}
        <SectionDivider />
        <SectionAncoragem />
        {/* Ancoragem (dark) → Oferta (dark) */}
        <SectionOferta />
        {/* Oferta (dark) → Garantia (light) */}
        <SectionTransition from="dark" to="light" />
        <SectionGarantia />
        {/* Garantia (light) → FAQ (dark) */}
        <SectionTransition from="light" to="dark" />
        <SectionFaq />
        {/* FAQ (dark) → WhatsApp (light) */}
        <SectionTransition from="dark" to="light" />
        <SectionWhatsapp />
        {/* WhatsApp (light) → Fechamento (dark) */}
        <SectionTransition from="light" to="dark" />
        <SectionFechamento />
      </div>
      <StickyCta />
      <GlobalFloats />
      <CheckoutPopup isOpen={isOpen} onClose={closeCheckout} />
    </div>
  );
};

const Index = () => (
  <CheckoutProvider>
    <IndexContent />
  </CheckoutProvider>
);

export default Index;
