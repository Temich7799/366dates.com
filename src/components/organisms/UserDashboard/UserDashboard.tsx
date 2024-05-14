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
        namePlaceholder: string;
        cityPlaceholder: string;
        notePlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
    }
    userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
    addFriendTitle,
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
    const [upcomingFriendsData, setUpcomingFriendData] = useState<User[]>([]);

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
        const upcomingFriends = friendsData.filter(friend => {
            const daysUntil = calculateDaysUntilBirthday(`${friend.day}/${friend.month}`);
            return daysUntil > 0;
        });
        setUpcomingFriendData(upcomingFriends);
    }, [friendsData]);

    const { t } = useTranslation(language);

    return (
        <>
            <section>
                <NewUserFormInitial
                    userId={userId}
                    placeholders={placeholders}
                    title={addFriendTitle}
                    showDaysUntil={true}
                    months={months}
                    initialDay={currentDay as number}
                    initialMonthIndex={currentMonthIndex as number}
                    buttonText={addFriendButtonText}
                    onSubmit={onSubmitHandler}
                />
            </section>
            <section>
                <UsersTable
                    data={friendsData}
                    t={t}
                    exclude={['language', 'foreign', 'another_foreign', 'id']}
                />
            </section>
            <section>
                <Text tag='h2'>{upcomingFriendsTitle}</Text>
                <UsersTable
                    data={upcomingFriendsData}
                    t={t}
                    exclude={['language', 'foreign', 'another_foreign', 'id']}
                    additionalColumns={upcomingFriendsColumns}
                />
            </section>
        </>
    );
};

export default UserDashboard;
