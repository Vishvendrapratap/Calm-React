'use client';

import { useTheme } from '../../context/ThemeContext';
import './ThemeChanger.css';

const ThemeChanger = () => {
  const {toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Switch Theme
    </button>
  );
};

export default ThemeChanger;
