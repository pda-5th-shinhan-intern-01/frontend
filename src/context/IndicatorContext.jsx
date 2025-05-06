import { createContext, useContext, useState } from "react";

const IndicatorContext = createContext();

export function IndicatorProvider({ children }) {
  const [focusedIndicator, setFocusedIndicator] = useState(null);

  return (
    <IndicatorContext.Provider
      value={{ focusedIndicator, setFocusedIndicator }}
    >
      {children}
    </IndicatorContext.Provider>
  );
}

export const useIndicator = () => useContext(IndicatorContext);
