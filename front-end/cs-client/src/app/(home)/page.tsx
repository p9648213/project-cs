import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BonusCards from "@/components/BonusCards";
import JackpotsSection from "@/components/JackpotsSection";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-casino-dark">
      <SideMenu />
      <Header />
      <main className="ml-64 pt-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <HeroSection />
            <BonusCards />
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">New Games</h2>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Go To Category
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
