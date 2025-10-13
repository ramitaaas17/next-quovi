import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quovi - Descubre Sabores Únicos',
  description: 'Encuentra restaurantes locales y experiencias auténticas cerca de ti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}