"use client";

import { useCollapseContext } from "@/context/collapse-context";
import React from "react";

const RoulettePage = () => {
  const { isCollapsed } = useCollapseContext();

  const marginLeft = isCollapsed ? "96px" : "256px";

  return (
    <div className={`mt-16  p-4 text-white`} style={{ marginLeft }}>
      roulette
    </div>
  );
};

export default RoulettePage;
