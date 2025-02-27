import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-casino-card to-casino-dark p-8 mb-8">
      <div className="relative z-10 max-w-xl">
        <div className="inline-block bg-casino-red text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          +50
        </div>
        <h1 className="text-4xl font-bold mb-4">Casino</h1>
        <h2 className="text-2xl font-bold mb-2">
          First deposit <span className="text-casino-red">Bonus</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Best ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
        <div className="space-x-4">
          <Button className="bg-casino-red hover:bg-casino-red/90">
            Get Started
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <img
          src="https://lime-agency.io/wp-content/uploads/2022/11/11.png"
          alt="Casino illustration"
          className="w-96 animate-float"
        />
      </div>
    </div>
  );
};

export default HeroSection;
