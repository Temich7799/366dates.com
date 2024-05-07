'use client'

import { ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";

const NoUsersContent: React.FC<{ message?: string, actionPath: string }> = ({ message, actionPath }) => {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <Button onClick={() => router.push(pathname + actionPath)}>
                Add
            </Button>
        </div>
    )
}

type NoUsersWrapperProps = {
    children: ReactNode;
    usersData: Array<any>;
    message?: string;
    actionPath: string;
}

const NoUsersWrapper: React.FC<NoUsersWrapperProps> = ({ children, usersData = [], message, actionPath }) => {

    return usersData.length
        ? children
        : <NoUsersContent message={message} actionPath={actionPath} />
}

export default NoUsersWrapper;