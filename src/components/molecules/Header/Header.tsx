import { Button } from "@/components/atoms/Button/Button"
// import { LanguageSelector } from "@/components/atoms/LanguageSelector/LanguageSelector"
import { useTranslation } from "../../../../app/i18n"
import Link from "next/link";
import styles from './Header.module.scss';
import SignOutButton from "@/components/atoms/SignOutButton/SignOutButton";
import { ReactNode } from "react";

type HeaderProps = {
    language: string;
    isLogged?: boolean;
    children?: ReactNode;
}

const Header: React.FC<HeaderProps> = async ({ language, isLogged, children }) => {

    const { t } = await useTranslation(language);

    return (
        <header className={styles.header}>
            {children}
            {
                !isLogged
                    ? (
                        <>
                            <Link href="/auth/login"><Button>{t('login')}</Button></Link>
                            <Link href="/auth/sign-up"><Button>{t('sign-up')}</Button></Link>
                        </>
                    )
                    : <SignOutButton children={t('sign-out')} />
            }
            {/* <LanguageSelector /> */}
        </header>
    )
}

export default Header;