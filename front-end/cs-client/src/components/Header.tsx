import { Search, Bell, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="top-0 right-0 left-64 z-10 fixed flex justify-between items-center bg-casino-card/95 backdrop-blur-sm px-6 border-white/5 border-b h-16">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2 transform" />
          <input
            type="search"
            placeholder="Search games..."
            className="bg-white/5 py-2 pr-4 pl-10 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-casino-red/50 w-64 h-9 text-sm"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-6 ml-6">
          <Link
            href="/roulette"
            className="font-medium text-gray-400 hover:text-white text-sm transition-colors"
          >
            Roulette
          </Link>
          <a
            href="#"
            className="font-medium text-gray-400 hover:text-white text-sm transition-colors"
          >
            Crash
          </a>
          <a
            href="#"
            className="font-medium text-gray-400 hover:text-white text-sm transition-colors"
          >
            Coinflip
          </a>
          <a
            href="#"
            className="font-medium text-gray-400 hover:text-white text-sm transition-colors"
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
          <Wallet className="mr-2 w-4 h-4" />
          <span>0.00</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-300 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="-top-1 -right-1 absolute bg-casino-red rounded-full w-2 h-2" />
        </Button>
        <Button className="bg-casino-red hover:bg-casino-red/90 h-9">
          <User className="mr-2 w-4 h-4" />
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
