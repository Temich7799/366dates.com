import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import RedirectFallback from './RedirectFallback';
import AuthProviderClient from './AuthProviderClient';

type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    const cookieStore = cookies();

    const isLogged = cookieStore.has('Auth');

    return isLogged
        ? (
            <AuthProviderClient isLogged={isLogged}>
                {children}
            </AuthProviderClient>
        ) : <RedirectFallback fallback={children} />
}

export default AuthProvider;