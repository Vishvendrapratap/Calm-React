import '../styles/global.css';

export const metadata = {
  title: 'DocEase – Document Services Made Simple',
  description: 'Apply for rent agreements, domicile certificates, marriage certificates, and character certificates online.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
