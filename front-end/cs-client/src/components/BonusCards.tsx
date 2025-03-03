import { Trophy, CoinsIcon, Gamepad2 } from "lucide-react";

const bonusCards = [
  {
    icon: Trophy,
    title: "Daily Reward",
    amount: "1,000",
    subtitle: "Coins available",
    isNew: true,
  },
  {
    icon: CoinsIcon,
    title: "Weekly Bonus",
    amount: "5,000",
    subtitle: "Join the weekly race",
    isNew: true,
  },
  {
    icon: Gamepad2,
    title: "Special Event",
    amount: "10,000",
    subtitle: "Limited time offer",
    isNew: false,
  },
];

const BonusCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {bonusCards.map((card, index) => (
        <div
          key={index}
          className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 bg-casino-card/80 backdrop-blur-sm border border-white/10 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <card.icon className="w-8 h-8 text-casino-red group-hover:scale-110 transition-transform duration-300" />
            {card.isNew && (
              <span className="bg-casino-red px-2 py-1 rounded text-xs font-medium animate-pulse">
                NEW
              </span>
            )}
          </div>
          <h3 className="text-sm text-gray-400 mb-1">{card.title}</h3>
          <p className="text-2xl font-bold group-hover:text-casino-red transition-colors">
            {card.amount}
          </p>
          <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default BonusCards;
