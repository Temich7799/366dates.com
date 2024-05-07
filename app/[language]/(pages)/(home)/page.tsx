import React from 'react';
import { BirthdayText } from '@/components/molecules/BirthdayText/BirthdayText';
import { PageNextProps } from '@/ts/PageNextPropsType';
import { User } from '@/ts/UserType';
import { SearchUsersForm } from '@/components/organisms/SearchUsersForm/SearchUsersForm';
import useMonths from '@/hooks/useMonths';
import UsersTable from '@/components/organisms/UsersTable/UsersTable';
import StyledSearchPage from '@/components/molecules/StyledSearchPage/StyledSearchPage';
import NewUserFormInitial from '@/components/organisms/NewUserFormInitial/NewUserFormInitial';
import { useTranslation } from '../../../i18n';
import { cookies } from 'next/headers';
import Header from '@/components/molecules/Header/Header';

export const metadata = {
  title: 'Willkommen beim Freundeskalender - Ihr perfekter Partner für unvergessliche Treffen und Feiern!',
  description: 'Entdecken Sie eine neue Welt der Möglichkeiten, Geburtstage mit Freunden und Lieben zu feiern. Planen Sie Treffen, teilen Sie Eindrücke und bewahren Sie die schönsten Momente mit uns auf!'
}

export default async function SearchUsersPage({ searchParams, params }: PageNextProps) {

  const { language } = params;

  const date = new Date();

  const { day: currentDay = date.getDate(), month: currentMonthIndex = date.getMonth() + 1, city } = searchParams;

  let endpoint = null;

  if (currentMonthIndex && currentDay) endpoint = process.env.NEXT_API_BASE_URL + `getAllUsers?birthday=${`${currentDay}/${currentMonthIndex}`}`;

  if (city) endpoint += `&city=${city}`;

  const usersData: User[] | undefined = endpoint && await fetch(endpoint)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.error(error)
    });

  const { t } = await useTranslation(language);
  const months = await useMonths(language);

  const cookieStore = cookies();

  const isLogged = cookieStore.has('Auth');

  return (
    <StyledSearchPage>
      <Header language={language} isLogged={isLogged} />
      <SearchUsersForm months={months} title={t('choose')} buttonTitle={t('search_btn')} cityLabel={t('cities')} currentMonth={currentMonthIndex as number} currentCity={city as string} currentDay={currentDay as number} />
      <UsersTable data={usersData as User[]} t={t} exclude={['month', 'day', 'note']} />
      <BirthdayText month={currentMonthIndex as string} day={`${currentDay}`} language={language} />
      {!isLogged && usersData?.length && <NewUserFormInitial title={t('user_new')} namePlaceholder={t('name_holder')} actionPath="/auth/sign-up" months={months} initialMonthIndex={currentMonthIndex as number} initialDay={currentDay as number} />}
    </StyledSearchPage>
  );
}