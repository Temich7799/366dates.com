'use client'

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./AuthProviderClient";

type RedirectFallbackProps = {
    fallback: ReactNode;
}

const RedirectFallback = ({ fallback }: RedirectFallbackProps) => {

    const { isLogged } = useAuth();

    const [children, setChildren] = useState<ReactNode>(fallback);

    const pathname = usePathname();
    const router = useRouter();

    const endpoints = pathname.split('/');

    const isHomePage = endpoints.length <= 2;
    const isLoginPage = endpoints[2] + '/' + endpoints[3] === 'auth/login';
    const isSignUpPage = endpoints[2] + '/' + endpoints[3] === 'auth/sign-up';

    useEffect(() => {
        if (!isLogged) {
            if (!(isHomePage || isLoginPage || isSignUpPage)) router.push('/auth/login');
        }
        else setChildren(fallback);
    }, [isLogged]);

    return children;
}

export default RedirectFallback;