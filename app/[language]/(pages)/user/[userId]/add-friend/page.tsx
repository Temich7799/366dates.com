// import { emailValidator, baseValidator } from '@/src/utils/validation';
import { PageNextProps } from '@/ts/PageNextPropsType';
import NewUserFormWrapper from '@/components/molecules/NewUserFormWrapper/NewUserFormWrapper';
import { useTranslation } from '../../../../../i18n';

export const metadata = {
  title: 'Freund hinzufügen - Freundeskalender',
  description: 'Fügen Sie Ihrem Freundeskreis neue Mitglieder hinzu und verpassen Sie nie wieder die Geburtstage Ihrer Liebsten!'
}

export default async function NewFriendPage({ params }: PageNextProps) {

  const { language, userId = '' } = params;

  const { t } = await useTranslation(language);

  return (
    <NewUserFormWrapper title={t('add_friend')} language={language} type="friend" userId={userId} />
  );
}