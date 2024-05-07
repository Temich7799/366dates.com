'use client'

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ReactNode } from "react";
import { LanguageContextProvider } from "@/contexts/CurrentLanguageContext";
import CookieConsent from "react-cookie-consent";

type RootLayoutProps = {
  children: ReactNode;
  params: {
    language: string
  }
}

export default function PageLayout({ children, params }: RootLayoutProps) {

  const { language } = params;

  return (
    <LanguageContextProvider value={{ language }}>
      <Provider store={store}>
        {children}
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
      </Provider>
    </LanguageContextProvider>
  )
}
