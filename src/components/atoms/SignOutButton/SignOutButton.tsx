'use client'

import { ReactNode } from "react";
import { Button } from "../Button/Button";
import { usePathname, useRouter } from "next/navigation";

type SignOutButtonProps = {
    children: ReactNode;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ children }) => {

    const router = useRouter();
    const pathname = usePathname();

    const onClickHandler = () => {
        document.cookie = 'Auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        pathname.split('/').length === 2 ? router.refresh() : router.push('/');
    }

    return <Button onClick={onClickHandler}>{children}</Button>
}

export default SignOutButton;