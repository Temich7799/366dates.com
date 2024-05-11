'use client'

import { Text } from '@/components/atoms/Text/Text';
import NewUserFormInitial from '@/components/organisms/NewUserFormInitial/NewUserFormInitial';
import UsersTable from '@/components/organisms/UsersTable/UsersTable';
import { User } from '@/ts/UserType';
import { Month } from '@/ts/MonthType';
import { useEffect, useState } from 'react';
import calculateDaysUntilBirthday from '@/utils/calculateDaysUntilBirthday';
import { useTranslation } from '../../../../app/i18n/client';


interface UserDashboardProps {
    addFriendTitle: string;
    namePlaceholder: string;
    myFriendsTitle: string;
    upcomingFriendsTitle: string;
    upcomingFriendsColumns: { Header: string; accessor: string }[];
    addFriendButtonText: string;
    friendsData: User[];
    months: Array<Month>;
    currentDay: string | number;
    currentMonthIndex: string | number;
    language: string;
    placeholders: {
        newUserSuccessMessage: string
        newUserErrorMessage: string;
    }
    userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
    addFriendTitle,
    namePlaceholder,
    myFriendsTitle,
    upcomingFriendsTitle,
    upcomingFriendsColumns,
    addFriendButtonText,
    friendsData: friendsDataInitial,
    months,
    currentDay,
    currentMonthIndex,
    language,
    userId,
    placeholders
}) => {

    const [friendsData, setFriendsData] = useState<User[]>(friendsDataInitial);
    const [upcomingFriendsData, setUpcomingFriendData] = useState<Array<any>>([]);

    const onSubmitHandler = (formData: { month: string; day: string; name: string, note?: string }) => {
        setFriendsData([
            ...friendsData,
            {
                email: '',
                language: '',
                city: '',
                foreign: '',
                another_foreign: '',
                ...formData,
            }
        ]);
    }

    useEffect(() => {

        friendsData && setUpcomingFriendData(

            friendsData.map((friend) => {

                const days_until = calculateDaysUntilBirthday(`${friend.day}/${friend.month}`);

                if (days_until > 0) {
                    return {
                        ...friend,
                        days_until
                    }
                }
            })
        )
    }, [friendsData]);

    const { t } = useTranslation(language);

    return (
        <>
            <section>
                <NewUserFormInitial
                    userId={userId}
                    placeholders={placeholders}
                    title={addFriendTitle}
                    namePlaceholder={namePlaceholder}
                    cityPlaceholder={t('city')}
                    notePlaceholder={t('notes')}
                    showDaysUntil={true}
                    months={months}
                    initialDay={currentDay as number}
                    initialMonthIndex={currentMonthIndex as number}
                    buttonText={addFriendButtonText}
                    onSubmit={onSubmitHandler}
                />
            </section>
            <section>
                <Text tag='h2'>{myFriendsTitle}</Text>
                <UsersTable
                    data={friendsData}
                    t={t}
                    exclude={['language', 'foreign', 'another_foreign']}
                />
            </section>
            <section>
                <Text tag='h2'>{upcomingFriendsTitle}</Text>
                <UsersTable
                    data={upcomingFriendsData}
                    t={t}
                    exclude={['language', 'foreign', 'another_foreign']}
                    additionalColumns={upcomingFriendsColumns}
                />
            </section>
        </>
    );
};

export default UserDashboard;
