import { Text } from '@/components/atoms/Text/Text';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import { PageNextProps } from '@/ts/PageNextPropsType';
import useMonths from '@/hooks/useMonths';
import { useTranslation } from '../../../../i18n';
import Header from '@/components/molecules/Header/Header';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button/Button';

import UserDashboard from '@/components/organisms/UserDashboard/UserDashboard';

export const metadata = {
    title: 'Blog des Freundeskalenders - Ihre Quelle für Inspiration und einzigartige Geschichten!',
    description: 'Tauchen Sie ein in die faszinierende Welt unserer Geschichten, inspirierenden Artikel und unterhaltsamen Fakten über Feiern und Treffen!'
}

const UserPage: React.FC<PageNextProps> = async ({ params, searchParams }) => {

    const { userId, language } = params;
    const { t } = await useTranslation(language);
    const months = await useMonths(language);

    const date = new Date();
    const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

    const placeholders = {
        newUserSuccessMessage: t('new_user_success'),
        newUserErrorMessage: t('new_user_error'),
        cityPlaceholder: t('city'),
        monthPlaceholder: t('month_holder'),
        dayPlaceholder: t('day_holder'),
        notePlaceholder: t('notes'),
        namePlaceholder: t('name_holder'),
    }

    return (
        <StyledSearchPage>
            <Header language={language} isLogged={true}>
                <Link href="/"><Button>{t('home')}</Button></Link>
            </Header>
            <Text tag='h1'>{t('blog_title')}</Text>
            <UserDashboard
                userId={userId}
                placeholders={placeholders}
                addFriendTitle={t('add_friend')}
                myFriendsTitle={t('my_friends')}
                upcomingFriendsTitle={t('upcoming_birthdays')}
                language={language}
                months={months}
                currentDay={currentDay as string}
                currentMonthIndex={currentMonthIndex as string}
                addFriendButtonText={t('add_friend')}
            />
        </StyledSearchPage>
    );
};

export default UserPage;
