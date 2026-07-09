import { createContext, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}