import TopBar from "@/components/TopBar";
import SectionHero from "@/components/SectionHero";
import SectionBadges from "@/components/SectionBadges";
import SectionProblema from "@/components/SectionProblema";

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
        <SectionBadges />
        <SectionProblema />
      </div>
    </div>
  );
};

export default Index;
