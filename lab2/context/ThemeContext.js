import { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightThemeColors, darkThemeColors } from '../themes/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() || 'light';
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else {
          setTheme(systemTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
        setTheme(systemTheme);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  const currentThemeColors = theme === 'light' ? lightThemeColors : darkThemeColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);