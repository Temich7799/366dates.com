'use client'

import { createContext, useContext } from "react";

type AuthContextType = {
    isLogged: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isLogged: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProviderClient = ({ children, isLogged }: { children: React.ReactNode, isLogged: boolean }) => {

    return (
        <AuthContext.Provider value={{ isLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviderClient;