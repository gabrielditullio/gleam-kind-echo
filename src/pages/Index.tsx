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
        {/* Hero→Badges: gradient transition built into SectionBadges */}
        <SectionBadges />
        <SectionDivider light />
        <SectionProblema />
        {/* Problema→ComoFunciona: gradient transition built into SectionComoFunciona */}
        <SectionComoFunciona />
        {/* ComoFunciona→Depoimentos: gradient transition built into SectionDepoimentos */}
        <SectionDepoimentos />
        <SectionDivider light />
        <SectionParaQuem />
        {/* ParaQuem→Modulos: gradient transition built into SectionModulos */}
        <SectionModulos />
        <SectionDivider light />
        <SectionBonus />
        <SectionDivider light />
        <SectionBio />
        {/* Bio→Passos: gradient transition built into SectionPassos */}
        <SectionPassos />
        <SectionDivider />
        <SectionAncoragem />
        <SectionOferta />
        {/* Oferta→Garantia: gradient transition built into SectionGarantia */}
        <SectionGarantia />
        <SectionDivider light />
        <SectionFaq />
        <SectionDivider />
        <SectionWhatsapp />
        {/* Whatsapp→Fechamento: gradient transition built into SectionFechamento */}
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
