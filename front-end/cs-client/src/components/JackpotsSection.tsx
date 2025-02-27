import Image from "next/image";

const jackpots = [
  {
    name: "Morning bay",
    amount: "2,000,000",
    avatar: "/vercel.svg",
  },
  {
    name: "Piscopi",
    amount: "2,000,000",
    avatar: "/next.svg",
  },
  {
    name: "Morning bay",
    amount: "2,000,000",
    avatar: "/globe.svg",
  },
  {
    name: "Piscopi",
    amount: "2,000,000",
    avatar: "/window.svg",
  },
];

const JackpotsSection = () => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Jackpots</h2>
      <div className="space-y-4">
        {jackpots.map((jackpot, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Image
                src={jackpot.avatar}
                alt={jackpot.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{jackpot.name}</span>
            </div>
            <span className="font-medium">{jackpot.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JackpotsSection;
