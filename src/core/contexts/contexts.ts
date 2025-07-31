import { createContext } from 'react';

interface IThemeContext {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  toggleTheme: () => {},
});
export default ThemeContext;
