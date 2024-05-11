'use client'

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./AuthProviderClient";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";

type RedirectFallbackProps = {
    fallback: ReactNode;
}

const RedirectFallback = ({ fallback }: RedirectFallbackProps) => {

    const { isLogged: isLoggedInitial = false } = useAuth();

    const [isLogged, setIsLogged] = useState<boolean>(isLoggedInitial);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const [children, setChildren] = useState<ReactNode>(fallback);

    const pathname = usePathname();
    const router = useRouter();

    const endpoints = pathname.split('/');

    // const isHomePage = endpoints.length <= 2;
    // const isLoginPage = endpoints[2] + '/' + endpoints[3] === 'auth/login';
    // const isSignUpPage = endpoints[2] + '/' + endpoints[3] === 'auth/sign-up';
    const isUserPage = pathname.includes('user/');

    useEffect(() => {
        if (!isUserPage) {
            setChildren(fallback);
        }
    }, []);

    useEffect(() => {
        if (!isLogged && isInitialized) {
            router.push('/auth/login');
        }
    }, [isLogged, isInitialized]);

    useEffect(() => {

        if (isUserPage) {

            const userId = endpoints[endpoints.length - 1];

            checkUserAuthentication(userId)
                .then((isUserChecked) => {
                    setIsLogged(isUserChecked);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLogged(false);
                })
                .finally(() => {
                    setIsInitialized(true);
                })
        }
    }, []);

    return children;
}

export default RedirectFallback;