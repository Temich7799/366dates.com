import { Text } from '@/components/atoms/Text/Text';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import { PageNextProps } from '@/ts/PageNextPropsType';
import useMonths from '@/hooks/useMonths';
import { User } from '@/ts/UserType';
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

    const months = await useMonths(language);

    const date = new Date();

    const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

    const friendsData: User[] = await fetch(process.env.NEXT_API_BASE_URL + 'getAllUserFriends', { method: 'POST', body: JSON.stringify({ userId }) })
        .then((res) => res.json())
        .then((res) => res)
        .catch((error) => {
            console.error(error)
        });

    const { t } = await useTranslation(language);

    return (
        <StyledSearchPage>
            <Header language={language} isLogged={true}>
                <Link href="/"><Button>{t('home')}</Button></Link>
            </Header>
            <Text tag='h1'>{t('blog_title')}</Text>
            <UserDashboard
                userId={userId}
                placeholders={{ newUserSuccessMessage: t('new_user_success'), newUserErrorMessage: t('new_user_error') }}
                addFriendTitle={t('add_friend')}
                namePlaceholder={t('name_holder')}
                myFriendsTitle={t('my_friends')}
                upcomingFriendsTitle={t('upcoming_birthdays')}
                upcomingFriendsColumns={[{ Header: t('days_until'), accessor: 'days_until' }]}
                friendsData={friendsData}
                language={language} months={months} currentDay={currentDay as string} currentMonthIndex={currentMonthIndex as string} addFriendButtonText={t('add_friend')} />
        </StyledSearchPage >
    );
};

export default UserPage;
