'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BirthdayInput from '@/components/atoms/BirthdayInput/BirthdayInput';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text/Text';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import createQueryString from '@/utils/createQueryString';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Month } from '@/ts/MonthType';
import DaysUntilBirthdayText from '@/components/molecules/DaysUntilBirthdayText/DaysUntilBirthdayText';

type NewUserFormInitialProps = {
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
    showDaysUntil?: boolean;
    title?: string;
    actionPath?: string;
    namePlaceholder?: string;
}

const NewUserFormInitial: React.FC<NewUserFormInitialProps> = ({ months, initialMonthIndex, initialDay, showDaysUntil = false, title, actionPath = '/add-friend', namePlaceholder }) => {

    const [formData, setFormData] = useState<{ month: string; day: string; name: string }>(() => ({
        month: `${initialMonthIndex}`,
        day: `${initialDay}`,
        name: '',
    }));

    const [birthday, setBirthday] = useState<string | undefined>('');

    const currentPath = usePathname();

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);

    const handleChange = useCallback((value: string | number, key: string) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
        setBirthday(`${value}/${formData.month}`);
    }, [formData.month]);

    const onChangeNameHandler = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({ ...prevData, name: target.value }));
    }, []);

    const queryString = useMemo(() => createQueryString({ ...formData, birthday: undefined }), [formData]);

    useEffect(() => {
        setBirthday(`${formData.day}/${formData.month}`);
    }, [formData]);

    return (
        <StyledForm>
            {title && <Text tag="h2">{title}</Text>}
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder={namePlaceholder} required value={formData.name} onChange={onChangeNameHandler} />
                <BirthdayInput months={months} initialMonthIndex={initialMonthIndex} initialDay={initialDay} onChangeHandler={handleChange} />
                <Link href={currentPath + actionPath + queryString}>
                    <Button>Add</Button>
                </Link>
            </form>
            {showDaysUntil && birthday && <DaysUntilBirthdayText birthday={birthday} />}
        </StyledForm>
    );
};

export default NewUserFormInitial;
