
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#D4AF37"); // Default gold color
  const [logoUrl, setLogoUrl] = useState("/logo.svg");

  useEffect(() => {
    // Check if the user has a theme preference in localStorage
    const storedTheme = localStorage.getItem("unshakn-theme");
    const storedColor = localStorage.getItem("unshakn-primary-color");
    const storedLogo = localStorage.getItem("unshakn-logo");

    // Apply stored preferences if they exist
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // If no stored preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    if (storedColor) {
      setPrimaryColor(storedColor);
      document.documentElement.style.setProperty("--primary", storedColor);
    }

    if (storedLogo) {
      setLogoUrl(storedLogo);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("unshakn-theme", newMode ? "dark" : "light");
    toast({
      title: `${newMode ? "Dark" : "Light"} mode activated`,
      description: `Theme has been changed to ${newMode ? "dark" : "light"} mode.`,
    });
  };

  const updatePrimaryColor = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem("unshakn-primary-color", color);
  };

  const updateLogoUrl = (url: string) => {
    setLogoUrl(url);
    localStorage.setItem("unshakn-logo", url);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        primaryColor,
        setPrimaryColor: updatePrimaryColor,
        logoUrl,
        setLogoUrl: updateLogoUrl,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
