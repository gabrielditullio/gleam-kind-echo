import TopBar from "@/components/TopBar";
import SectionHero from "@/components/SectionHero";
import SectionBadges from "@/components/SectionBadges";
import SectionProblema from "@/components/SectionProblema";
import SectionComoFunciona from "@/components/SectionComoFunciona";
import SectionDepoimentos from "@/components/SectionDepoimentos";
import SectionParaQuem from "@/components/SectionParaQuem";

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      <SectionHero />
      <SectionBadges />
      <SectionProblema />
      <SectionComoFunciona />
      <SectionDepoimentos />
      <SectionParaQuem />
    </div>
  );
};

export default Index;
