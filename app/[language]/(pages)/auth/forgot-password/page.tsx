import { PageNextProps } from '@/ts/PageNextPropsType';
import styles from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper.module.scss'
import { Text } from '@/components/atoms/Text/Text';
import { useTranslation } from '../../../../i18n';
import RemindForm from '@/components/organisms/RemindForm/RemindForm';

export const metadata = {
    title: '',
    description: ''
}

export default async function LoginPage({ params }: PageNextProps) {

    const { language } = params;

    const { t } = await useTranslation(language);

    return (
        <div className={styles.signup}>
            <Text tag='h1'>{t('forgot')}</Text>
            <RemindForm buttonTitle={t('submit')} />
        </div>
    );
}