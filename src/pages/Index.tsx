import TopBar from "@/components/TopBar";
import SectionHero from "@/components/SectionHero";
import SectionBadges from "@/components/SectionBadges";

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
        <SectionBadges />
      </div>
    </div>
  );
};

export default Index;
