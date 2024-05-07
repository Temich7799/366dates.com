import { Button } from "@/components/atoms/Button/Button"
// import { LanguageSelector } from "@/components/atoms/LanguageSelector/LanguageSelector"
import { useTranslation } from "../../../../app/i18n"
import Link from "next/link";
import styles from './Header.module.scss';
import SignOutButton from "@/components/atoms/SignOutButton/SignOutButton";
import { cookies } from 'next/headers'

type HeaderProps = {
    language: string;
    isLogged?: boolean;
}

const Header: React.FC<HeaderProps> = async ({ language, isLogged }) => {

    const { t } = await useTranslation(language);

    const cookieStore = cookies();

    const handleSignOut = () => {
        cookieStore.delete('Auth');
    }

    return (
        <header className={styles.header}>
            {
                isLogged
                    ? (
                        <>
                            <Link href="/auth/login"><Button>{t('login')}</Button></Link>
                            <Link href="/auth/sign-up"><Button>{t('sign-up')}</Button></Link>
                        </>
                    )
                    : (
                        <>
                            <Link href="/"><Button>{t('home')}</Button></Link>
                            <SignOutButton onClick={handleSignOut}>{t('sign-out')}</SignOutButton>
                        </>
                    )
            }
            {/* <LanguageSelector /> */}
        </header>
    )
}

export default Header;