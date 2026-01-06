
import '../app/globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'Admin UI',
  description: 'Admin panel with inquiry management',
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
