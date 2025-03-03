"use client";
import {
  Home,
  Gamepad2,
  Clock,
  Star,
  MonitorPlay,
  Zap,
  Gift,
  Sparkles,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/app/logo.png";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCollapseContext } from "@/context/collapse-context";

const menuItems = [
  { icon: Home, label: "Casino", href: "#" },
  { icon: Star, label: "Picks For You", href: "#" },
  { icon: Clock, label: "Recent", href: "#" },
  { icon: Gamepad2, label: "Slots", href: "#" },
  { icon: MonitorPlay, label: "Live Casino", href: "#" },
  { icon: Zap, label: "Hot Games", href: "#" },
  { icon: Gift, label: "New Releases", href: "#" },
  { icon: Sparkles, label: "High Volatility", href: "#" },
];

const SideMenu = () => {
  const { isCollapsed, setIsCollapsed } = useCollapseContext();

  return (
    <nav
      className={cn(
        "h-screen bg-casino-card fixed left-0 top-0 p-6 border-r border-white/10"
      )}
      style={{ width: isCollapsed ? "96px" : "256px" }}
    >
      <div className="flex items-center gap-2 mb-8">
        {!isCollapsed && (
          <Image src={logo} alt="Logo" width={200} height={200} />
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="bottom-0 left-0 absolute bg-casino-card hover:bg-white/10 border border-white/10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronLast className="w-4 h-4" />
        ) : (
          <ChevronFirst className="w-4 h-4" />
        )}
      </Button>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                "hover:bg-white/10"
              )}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
