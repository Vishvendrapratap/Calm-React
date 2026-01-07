'use client';

import ThemeChanger from '../ThemeChanger/ThemeChanger';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="logo">My App</h1>
      
      <div className="header-actions">
        <ThemeChanger />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
