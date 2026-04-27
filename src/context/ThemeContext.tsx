import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const system = Appearance.getColorScheme();

    const [theme, setTheme] = useState<Theme>(
        system === 'dark' ? 'dark' : 'light'
    );

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark: theme === 'dark',
                toggleTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}