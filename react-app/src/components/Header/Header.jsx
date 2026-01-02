import ThemeChanger from '../ThemeChanger/ThemeChanger';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>My React App</h1>
      <ThemeChanger />
    </header>
  );
};

export default Header;
