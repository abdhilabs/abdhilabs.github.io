import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-all duration-200",
        "text-gray-500 hover:text-gray-900 hover:bg-white/60",
        "dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-900/60",
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
