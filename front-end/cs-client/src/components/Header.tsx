import { Search, Bell, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-casino-card/95 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search games..."
            className="pl-10 pr-4 py-2 h-9 bg-white/5 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-casino-red/50 w-64 text-sm"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-6 ml-6">
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Roulette
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Crash
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Coinflip
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Case Battle
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/5 hover:bg-white/10 text-gray-300"
        >
          <Wallet className="w-4 h-4 mr-2" />
          <span>0.00</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-300 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-casino-red rounded-full" />
        </Button>
        <Button className="bg-casino-red hover:bg-casino-red/90 h-9">
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
