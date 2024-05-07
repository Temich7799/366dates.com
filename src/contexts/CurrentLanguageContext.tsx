import React, { createContext, useContext, ReactNode } from 'react';

type LanguageContextValue = {
    language: string;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageContextProvider: React.FC<{ children: ReactNode, value: LanguageContextValue }> = ({ children, value }) => {
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext: any = () => {

    const context = useContext(LanguageContext);
    
    if (!context) {
        throw new Error('useLanguageContext must be used within a LanguageContextProvider');
    }
    return context;
};
