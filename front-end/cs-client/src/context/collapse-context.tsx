"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type CollapseContextType = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollapseContext = createContext<CollapseContextType | undefined>(
  undefined
);

type CollapseContextProviderProps = {
  children: ReactNode;
};

export const CollapseContextProvider = ({
  children,
}: CollapseContextProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <CollapseContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </CollapseContext.Provider>
  );
};

export const useCollapseContext = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error(
      "useCollapseContext must be used within a CollapseContextProvider"
    );
  }
  return context;
};
