'use client'

import { ReactNode } from "react";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";

type SignOutButtonProps = {
    children: ReactNode;
    onClick: () => any;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ children, onClick }) => {

    const router = useRouter();

    const onClickHandler = () => {
        onClick();
        router.push('/');
    }

    return <Button onClick={onClickHandler}>{children}</Button>
}

export default SignOutButton;