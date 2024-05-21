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
    addFriendButtonText: string;
    friendsData?: User[];
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
    addFriendButtonText,
    friendsData: friendsDataInitial,
    months,
    currentDay,
    currentMonthIndex,
    language,
    userId,
    placeholders
}) => {
    const [friendsData, setFriendsData] = useState<User[]>(friendsDataInitial = []);
    const [upcomingFriendsData, setUpcomingFriendData] = useState<User[]>([]);

    const handleFormSubmit = (newFriendData: { month: string; day: string; name: string; note?: string }) => {
        const updatedFriends = [
            {
                ...newFriendData,
            },
            ...friendsData,
        ];
        setFriendsData(updatedFriends as User[]);
    }

    const fetchFriendsData = async (userId: string) => {
        try {
            const response = await fetch('/api/' + 'getAllUserFriends', {
                method: 'POST',
                body: JSON.stringify({ userId }),
                cache: 'no-store',
                mode: 'no-cors',
            });
            const data = await response.json();
            setFriendsData(data);
            // return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        fetchFriendsData(userId);
    }, []);

    useEffect(() => {
        const upcomingFriends: User[] = friendsData.map(friend => {
            const daysUntil = calculateDaysUntilBirthday(`${friend.day}/${friend.month}`);
            return {
                ...friend,
                days_until: daysUntil || 0,
            }
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
                    onSubmit={handleFormSubmit}
                />
            </section>
            <section>
                <Text tag='h2'>{upcomingFriendsTitle}</Text>
                <UsersTable
                    data={upcomingFriendsData}
                    t={t}
                    exclude={['language', 'foreign', 'another_foreign', 'id']}
                    additionalColumns={[{ Header: t('days_until'), accessor: 'days_until' }]}
                />
            </section>
        </>
    );
};

export default UserDashboard;
