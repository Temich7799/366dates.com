import styles from './NewUserFormWrapper.module.scss';
import { Text } from "@/components/atoms/Text/Text";
import { useTranslation } from "@/../app/i18n";
import useMonths from "@/hooks/useMonths";
import NewUserFormFull from "@/components/organisms/NewUserFormFull/NewUserFormFull";
import { Suspense } from 'react';

const NewUserFormWrapper: React.FC<{ title?: string, language: string, type?: 'user' | 'friend', userId?: string }> = async ({ title, language, type, userId }) => {

    const { t } = await useTranslation(language);
    const months = await useMonths(language);

    const formPlaceholders = {
        namePlaceholder: t('name'),
        cityPlaceholder: t('city'),
        langPlaceholder: t('language'),
        secondLangPlaceholder: t('foreign'),
        passwordPlaceholder: t('password_holder'),
        thirdLangPlaceholder: t('another_foreign'),
        newUserSuccessMessage: t('new_user_success'),
        newUserErrorMessage: t('new_user_error'),
        notesPlaceholder: t('notes'),
    }

    return (
        <div className={styles.signup}>
            {title && <Text tag="h1">{title}</Text>}
            <Suspense>
                <NewUserFormFull months={months} placeholders={formPlaceholders} buttonTitle={t('submit')} type={type} userId={userId} />
            </Suspense>
        </div>
    )
}

export default NewUserFormWrapper;