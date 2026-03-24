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

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
        <SectionBadges />
        <SectionProblema />
        <SectionComoFunciona />
        <SectionDepoimentos />
        <SectionParaQuem />
        <SectionModulos />
        <SectionBonus />
        <SectionBio />
      </div>
    </div>
  );
};

export default Index;
