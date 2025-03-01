"use client";

import React, { ReactNode, useContext, useState } from "react";

const CollapseContext = React.createContext<CollapseContextType | undefined>(
  undefined
);

type CollapseContextProviderProps = {
  children: ReactNode;
};

type CollapseContextType = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
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
