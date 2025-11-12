// frontend/src/components/providers/GoogleAuthProvider.tsx
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderWrapperProps {
  children: React.ReactNode;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function GoogleAuthProviderWrapper({ children }: GoogleAuthProviderWrapperProps) {
  if (!GOOGLE_CLIENT_ID) {
    console.warn('⚠️ NEXT_PUBLIC_GOOGLE_CLIENT_ID no está configurado');
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}