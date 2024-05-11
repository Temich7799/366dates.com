'use client';

import React, { useCallback, useEffect, useState } from 'react';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text/Text';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import DaysUntilBirthdayText from '@/components/molecules/DaysUntilBirthdayText/DaysUntilBirthdayText';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import { useTranslation } from '../../../../app/i18n/client';
import { Month } from '@/ts/MonthType';
import styles from './NewUserFormInitial.module.scss'
import CitySelect from '@/components/atoms/Input/CitySelect/CitySelect';
import { useRegisterMutation } from '@/lib/redux/api/authApi';
import { useAddFriendshipMutation } from '@/lib/redux/api/userApi';
import { toast } from 'react-toastify';
import generateRandomEmail from '@/utils/generateRandomEmail';

type NewUserFormInitialProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    showDaysUntil?: boolean;
    title?: string;
    buttonText: string;
    onSubmit?: (e: any) => void;
    actionPath?: string;
    namePlaceholder?: string;
    cityPlaceholder?: string;
    notePlaceholder?: string;
    userId?: string;
    placeholders: {
        newUserSuccessMessage: string
        newUserErrorMessage: string;
    }
};

const NewUserFormInitial: React.FC<NewUserFormInitialProps> = React.memo(({ months, initialMonthIndex, userId: userIdProps, placeholders, onSubmit: onSubmitHandler, cityPlaceholder, notePlaceholder, initialDay, buttonText, showDaysUntil = false, title, actionPath = '/add-friend', namePlaceholder }) => {

    const [formData, setFormData] = useState<{ month: string; day: string; name: string, note?: string }>(() => ({
        month: `${initialMonthIndex}`,
        day: `${initialDay}`,
        name: '',
        note: '',
        id: ''
    }));

    const [birthday, setBirthday] = useState<string | undefined>('');
    const [userId, setUserId] = useState(userIdProps);
    const [friendId, setFriendId] = useState<string>();


    const { language } = useLanguageContext();

    const [register, { data = {}, isLoading: isRegisterProcessing, isError: isRegisterError, isSuccess: isRegisterSuccess }] = useRegisterMutation();
    const [addFriendship, { isLoading: isFriendshipProcessing, isError: isFriendshipError, isSuccess: isFriendshipSuccess }] = useAddFriendshipMutation();

    const isLoading = isRegisterProcessing || isFriendshipProcessing;
    const isError = isRegisterError || isFriendshipError;
    const isSuccess = isRegisterSuccess && isFriendshipSuccess;

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitHandler && onSubmitHandler(formData);
        await register({ ...formData, email: generateRandomEmail(), password: 'nopass' });
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

    // const { newUserSuccessMessage, newUserErrorMessage } = placeholders;

    // useEffect(() => {
    //     if (isLoading) {
    //         toast.info('Benutzer wird hinzugefügt...', { autoClose: false });
    //     } else if (isSuccess) {
    //         toast.success(newUserSuccessMessage);
    //     } else if (isError) {
    //         toast.error(newUserErrorMessage);
    //     }
    // }, [isLoading, isSuccess, isError, userId]);

    const { t } = useTranslation(language);

    return (
        <StyledForm>
            {title && <Text tag="h2">{title}</Text>}
            <form onSubmit={handleSubmit} className={styles.newUserFormInitial}>
                <div className={styles.newUserFormInitial__formGroup}>
                    <Input type="text" placeholder={namePlaceholder} required value={formData.name} onChange={(e) => onChangeHandler(e, 'name')} />
                    <CitySelect placeholder={cityPlaceholder} onChange={(e) => onChangeHandler(e, 'city')} />
                </div>
                <BirthdayInput monthLabel={t('month_holder')} dayLabel={t('day_holder')} months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleChange} />
                <Input type="textfield" placeholder={notePlaceholder} value={formData.note} onChange={(e) => onChangeHandler(e, 'note')} />
                <Button type="submit">{buttonText}</Button>
            </form>
            {showDaysUntil && birthday && <DaysUntilBirthdayText birthday={birthday} />}
        </StyledForm>
    );
});

export default NewUserFormInitial;
