import TopBar from "@/components/TopBar";
import SectionHero from "@/components/SectionHero";

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      {/* Compensar top bar fixa */}
      <div className="pt-[40px] md:pt-[44px]">
        <SectionHero />
      </div>
    </div>
  );
};

export default Index;
