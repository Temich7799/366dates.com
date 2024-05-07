'use client'

import React, { useCallback, useEffect, useState } from 'react';
import styles from './SearchUsersForm.module.scss';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button/Button';
import { Month } from '@/ts/MonthType';
import { Text } from '@/components/atoms/Text/Text';
import { DefaultSearchParams } from '@/ts/DefaultSearchParamsType';
import createQueryString from '@/utils/createQueryString';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import CitySelect from '@/components/atoms/Input/CitySelect/CitySelect';

type SearchUsersFormProps = {
  months: Array<Month>;
  currentMonth?: number;
  currentDay?: number;
  currentCity?: string;
  title: string;
  buttonTitle: string;
  cityLabel: string;
};

export const SearchUsersForm: React.FC<SearchUsersFormProps> = ({ currentMonth: initialMonthIndex = 1, currentDay: initialDay = 1, currentCity: initialCity, title, buttonTitle, cityLabel, months }) => {

  const [formData, setFormData] = useState<DefaultSearchParams>({
    month: `${initialMonthIndex}`,
    day: `${initialDay}`,
    city: initialCity,
  });

  const onChangeHandler = useCallback((value: string | number, key: string) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }, [formData]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const queryString = createQueryString({ ...formData, birthday: undefined });
    window.location.href = window.location.pathname + queryString;
  };

  return (
    <section>
      <div className={styles.search}>
        <Text tag="h1">{title}</Text>
      </div>
      <StyledForm>
        <form onSubmit={onSubmitHandler}>
          <BirthdayInput months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={onChangeHandler} />
          <CitySelect placeholder={cityLabel} id="city" defaultValue={initialCity} onChange={(e: any) => { onChangeHandler(e.target.value, 'city') }} />
          <Button type="submit">{buttonTitle}</Button>
        </form>
      </StyledForm>
    </section>
  );
};
