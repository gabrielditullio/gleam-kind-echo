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

const IndexV2Content = () => {
  const { isOpen, closeCheckout } = useCheckout();

  return (
    <div className="font-body text-neutral-800 green-cta-variant">
      <TopBar />
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
        <SectionTransition from="dark" to="light" />
        <SectionBadges />
        <SectionDivider light />
        <SectionProblema />
        <SectionTransition from="light" to="dark" />
        <SectionComoFunciona />
        <SectionTransition from="dark" to="light" />
        <SectionDepoimentos />
        <SectionTransition from="light" to="dark" />
        <SectionParaQuem />
        <SectionTransition from="dark" to="light" />
        <SectionModulos />
        <SectionDivider light />
        <SectionBonus />
        <SectionDivider light />
        <SectionBio />
        <SectionTransition from="light" to="dark" />
        <SectionPassos />
        <SectionDivider />
        <SectionAncoragem />
        <SectionOferta />
        <SectionTransition from="dark" to="light" />
        <SectionGarantia />
        <SectionTransition from="light" to="dark" />
        <SectionFaq />
        <SectionTransition from="dark" to="light" />
        <SectionWhatsapp />
        <SectionTransition from="light" to="dark" />
        <SectionFechamento />
      </div>
      <StickyCta />
      <GlobalFloats />
      <CheckoutPopup isOpen={isOpen} onClose={closeCheckout} />
    </div>
  );
};

const IndexV2 = () => (
  <CheckoutProvider>
    <IndexV2Content />
  </CheckoutProvider>
);

export default IndexV2;
