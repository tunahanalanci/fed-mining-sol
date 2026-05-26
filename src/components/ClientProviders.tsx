'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { QuoteProvider } from '@/context/QuoteContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <QuoteProvider>
        {children}
      </QuoteProvider>
    </LanguageProvider>
  );
}
