import { createContext, useContext, useState } from "react";

const IndicatorContext = createContext();

export function IndicatorProvider({ children }) {
  const [focusedIndicator, setFocusedIndicator] = useState(null);
  const [lastClickedY, setLastClickedY] = useState(null);

  return (
    <IndicatorContext.Provider
      value={{
        focusedIndicator,
        setFocusedIndicator,
        lastClickedY,
        setLastClickedY,
      }}
    >
      {children}
    </IndicatorContext.Provider>
  );
}

export const useIndicator = () => useContext(IndicatorContext);
