import HeroSection from "@/components/hero-section";
import BonusCards from "@/components/bonus-cards";
import JackpotsSection from "@/components/jackpots-section";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className="bg-casino-dark min-h-screen">
      <main className="ml-64 px-6 pt-24">
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            <HeroSection />
            <BonusCards />
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl">New Games</h2>
                <button className="text-gray-400 hover:text-white text-sm transition-colors">
                  Go To Category
                </button>
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {/* Game cards will go here in future updates */}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <JackpotsSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
