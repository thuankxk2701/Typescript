import * as React from "react";

export interface NavbarContextType {
  onToggle: () => void;
  bsPrefix?: string;
  expanded: boolean;
}

const navbarContext = React.createContext<NavbarContextType | null>(null);
navbarContext.displayName = "NavbarContext";

export default navbarContext;
