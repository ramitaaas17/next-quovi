// frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAuthProviderWrapper from '@/components/providers/GoogleAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quovi - Descubre Sabores Únicos',
  description: 'La mejor plataforma para descubrir y compartir experiencias culinarias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <GoogleAuthProviderWrapper>
          {children}
        </GoogleAuthProviderWrapper>
      </body>
    </html>
  );
}