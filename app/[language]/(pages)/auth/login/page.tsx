import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import { PageNextProps } from '@/ts/PageNextPropsType';
import styles from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper.module.scss'
import { Text } from '@/components/atoms/Text/Text';
import { useTranslation } from '../../../../i18n';

export const metadata = {
  title: 'Anmeldung - Freundeskalender',
  description: 'Melden Sie sich beim Freundeskalender an und genießen Sie den Zugriff auf Ihre persönlichen Daten und Funktionen!'
}

export default async function LoginPage({ params }: PageNextProps) {

  const { language } = params;

  const { t } = await useTranslation(language);

  return (
    <div className={styles.signup}>
      <Text tag='h1'>{t('login')}</Text>
      <LoginForm forgotPasswordTitle={t('forgot')} buttonTitle={t('login')} placeholders={{ passwordPlaceholder: t('password_holder') }} registerButtonTitle={t('sign-up')} />
    </div>
  );
}