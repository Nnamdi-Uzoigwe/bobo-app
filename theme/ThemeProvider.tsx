import { useThemeStore } from "@/store/themeStore";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { darkColors, lightColors, type ColorTokens } from "./colors";

type ResolvedMode = "light" | "dark";

type ThemeContextValue = {
  resolvedMode: ResolvedMode;
  colors: ColorTokens;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode);
  const [systemScheme, setSystemScheme] = useState(
    Appearance.getColorScheme() ?? "light",
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme ?? "light");
    });
    return () => subscription.remove();
  }, []);

  const resolvedMode: ResolvedMode =
    mode === "system" ? (systemScheme as ResolvedMode) : mode;

  const colors = resolvedMode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ resolvedMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
