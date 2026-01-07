
import '../styles/global.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'User UI',
  description: 'User panel with inquiry form',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
