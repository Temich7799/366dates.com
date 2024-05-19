'use client';

import React, { useCallback, useEffect, useState } from 'react';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text/Text';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import DaysUntilBirthdayText from '@/components/molecules/DaysUntilBirthdayText/DaysUntilBirthdayText';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import { Month } from '@/ts/MonthType';
import styles from './NewUserFormInitial.module.scss'
import CitySelect from '@/components/atoms/Input/CitySelect/CitySelect';
import { useRegisterMutation } from '@/lib/redux/api/authApi';
import { useAddFriendshipMutation } from '@/lib/redux/api/userApi';
import generateRandomEmail from '@/utils/generateRandomEmail';
import getMonthName from '@/utils/getMonthName';

type NewUserFormInitialProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    showDaysUntil?: boolean;
    title?: string;
    buttonText: string;
    onSubmit?: (e: any) => void;
    actionPath?: string;
    userId?: string;
    placeholders: {
        newUserSuccessMessage: string;
        newUserErrorMessage: string;
        namePlaceholder?: string;
        cityPlaceholder?: string;
        notePlaceholder?: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
    }
};

const NewUserFormInitial: React.FC<NewUserFormInitialProps> = React.memo(({ months, initialMonthIndex, userId: userIdProps, placeholders, onSubmit: onSubmitHandler, initialDay, buttonText, showDaysUntil = false, title, actionPath = '/add-friend' }) => {

    const [formData, setFormData] = useState<{ month: string; day: string; name: string, note?: string, month_name: string }>(() => ({
        month: `${initialMonthIndex}`,
        day: `${initialDay}`,
        name: '',
        note: '',
        month_name: '',
        id: ''
    }));

    const [birthday, setBirthday] = useState<string | undefined>('');
    const [userId, setUserId] = useState(userIdProps);
    const [friendId, setFriendId] = useState<string>();

    const [register, { data = {}, isLoading: isRegisterProcessing, isError: isRegisterError, isSuccess: isRegisterSuccess }] = useRegisterMutation();
    const [addFriendship, { isLoading: isFriendshipProcessing, isError: isFriendshipError, isSuccess: isFriendshipSuccess }] = useAddFriendshipMutation();

    // const isLoading = isRegisterProcessing || isFriendshipProcessing;
    // const isError = isRegisterError || isFriendshipError;
    // const isSuccess = isRegisterSuccess && isFriendshipSuccess;

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitHandler && onSubmitHandler(formData);
        register({ ...formData, email: generateRandomEmail(), password: 'nopass' })
            .then(() => {
                setFormData({
                    month: `${initialMonthIndex}`,
                    day: `${initialDay}`,
                    name: '',
                    note: '',
                    month_name: getMonthName(initialMonthIndex),
                })
            })
    }, [formData]);

    const handleChange = useCallback((value: string | number, key: string) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
    }, [formData.month, formData.day]);

    const onChangeHandler = useCallback(({ target }: React.ChangeEvent<any>, key: string) => {
        setFormData(prevData => ({ ...prevData, [key]: target.value }));
    }, []);

    useEffect(() => {
        setBirthday(`${formData.day}/${formData.month}`);
    }, [formData]);

    useEffect(() => {
        if (data.data) {
            setFriendId(data.data.userId);
        }
        if (userId && friendId) {
            (isRegisterSuccess && friendId) && addFriendship({ userId, friendId });
        }
    }, [addFriendship, friendId, isRegisterSuccess, userId, data]);

    const { monthPlaceholder, dayPlaceholder, cityPlaceholder, notePlaceholder, namePlaceholder } = placeholders;

    return (
        <StyledForm>
            {title && <Text tag="h2">{title}</Text>}
            <form onSubmit={handleSubmit} className={styles.newUserFormInitial}>
                <div className={styles.newUserFormInitial__formGroup}>
                    <Input type="text" placeholder={namePlaceholder} required value={formData.name} onChange={(e) => onChangeHandler(e, 'name')} />
                    <CitySelect required placeholder={cityPlaceholder} onChange={(e) => onChangeHandler(e, 'city')} />
                </div>
                <BirthdayInput monthLabel={monthPlaceholder} dayLabel={dayPlaceholder} months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleChange} />
                <Input type="textfield" placeholder={notePlaceholder} value={formData.note} onChange={(e) => onChangeHandler(e, 'note')} />
                <Button type="submit">{buttonText}</Button>
            </form>
            {showDaysUntil && birthday && <DaysUntilBirthdayText birthday={birthday} />}
        </StyledForm>
    );
});

export default NewUserFormInitial;
