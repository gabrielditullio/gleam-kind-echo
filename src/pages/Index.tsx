import TopBar from "@/components/TopBar";

const Index = () => {
  return (
    <div className="font-body text-texto-corpo">
      <TopBar />
      {/* Compensar top bar fixa */}
      <div className="pt-[40px] md:pt-[44px]">
        {/* Placeholder para visualizar a top bar */}
        <section className="bg-roxo-profundo min-h-screen flex items-center justify-center">
          <p className="font-headline font-bold text-h2-mobile md:text-h2 text-white text-center px-5">
            Página de Vendas — Conteúdo em breve
          </p>
        </section>
      </div>
    </div>
  );
};

export default Index;
