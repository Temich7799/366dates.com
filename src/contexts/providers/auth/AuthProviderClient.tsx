'use client'

import { createContext, useContext } from "react";
import RedirectFallback from "./RedirectFallback";

type AuthContextType = {
    isLogged?: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isLogged: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children, isLogged }: { children: React.ReactNode, isLogged?: boolean }) => {

    return (
        <AuthContext.Provider value={{ isLogged }}>
            <RedirectFallback fallback={children} />
        </AuthContext.Provider>
    );
};

export default AuthProvider;