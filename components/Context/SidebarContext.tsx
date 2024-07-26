import React, { createContext, useState, useContext, ReactNode } from 'react';

type SidebarContextType = {
  sidebarHidden: boolean;
  setSidebarHidden: (hidden: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={{ sidebarHidden, setSidebarHidden }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
