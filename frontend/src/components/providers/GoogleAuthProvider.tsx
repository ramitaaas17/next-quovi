'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderWrapperProps {
  children: React.ReactNode;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

/**
 * Wrapper para configurar autenticación con Google OAuth
 * Verifica que el Client ID esté configurado antes de inicializar
 */
export default function GoogleAuthProviderWrapper({ children }: GoogleAuthProviderWrapperProps) {
  // Si no hay Client ID, renderiza sin el provider
  if (!GOOGLE_CLIENT_ID) {
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}