import { Text } from '@/components/atoms/Text/Text';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import { PageNextProps } from '@/ts/PageNextPropsType';
import useMonths from '@/hooks/useMonths';
import NewUserFormInitial from '@/components/organisms/NewUserFormInitial/NewUserFormInitial';
import UsersTable from '@/components/organisms/UsersTable/UsersTable';
import { User } from '@/ts/UserType';
import calculateDaysUntilBirthday from '@/utils/calculateDaysUntilBirthday';
import NoUsersWrapper from '@/components/molecules/NoUsersWrapper/NoUsersWrapper';
import { useTranslation } from '../../../../i18n';

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

    const upcomingFriendsData = friendsData && friendsData.map((friend) => {

        const days_until = calculateDaysUntilBirthday(`${friend.day}/${friend.month}`);

        if (days_until > 0) {
            return {
                ...friend,
                days_until
            }
        }
    }) as User[];

    const { t } = await useTranslation(language);

    return (
        <StyledSearchPage>
            <Text tag='h1'>Blog</Text>
            <section>
                <NewUserFormInitial title='Add a friend' namePlaceholder={t('name_holder')} showDaysUntil={true} months={months} initialDay={currentDay as number} initialMonthIndex={currentMonthIndex as number} />
            </section>
            <section>
                <Text tag='h2'>My friends</Text>
                <NoUsersWrapper usersData={friendsData as User[]} actionPath='/add-friend'>
                    <UsersTable data={friendsData as User[]} t={t} exclude={['language', 'foreign', 'another_foreign']} />
                </NoUsersWrapper>
                <NoUsersWrapper usersData={upcomingFriendsData || []} actionPath='/add-friend'>
                    <UsersTable data={upcomingFriendsData || []}
                        t={t}
                        exclude={['language', 'foreign', 'another_foreign']}
                        additionalColumns={[{ Header: t('days_until'), accessor: 'days_until' },]}
                    />
                </NoUsersWrapper>
            </section>
        </StyledSearchPage >
    );
};

export default UserPage;
