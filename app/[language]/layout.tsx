import '@/index.scss';
import { ReactNode } from "react";
import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import AuthProvider from "@/contexts/providers/auth";

type RootLayoutProps = {
  children: ReactNode;
  params: {
    language: string
  }
}

export async function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export default function RootLayout({ children, params }: RootLayoutProps) {

  const { language } = params;

  return (
    <html lang={language} dir={dir(language)}>
      <body>
        <AuthProvider>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
