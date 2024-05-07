import { PageNextProps } from '@/ts/PageNextPropsType';
import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';
import { useTranslation } from '../../../../i18n';

export const metadata = {
  title: 'Registrierung - Freundeskalender',
  description: 'Treten Sie dem Freundeskalender bei und erstellen Sie Ihr Konto, um die Funktionen zum Verwalten von Geburtstagen und Treffen zu nutzen!'
}

export default async function SignUpPage({ params }: PageNextProps) {

  const { language } = params;

  const { t } = await useTranslation(language);

  return (
    <NewUserFormWrapper title={t('sign-up')} language={language} />
  );
}