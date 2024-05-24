'use client'

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button/Button';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import { useRemindMutation } from '@/lib/redux/api/authApi';

type RemindFormProps = {
    buttonTitle: string;
}

const RemindForm: React.FC<RemindFormProps> = ({ buttonTitle }) => {

    const [formData, setFormData] = useState<{ email: string }>({ email: '' });

    const [remind, { isLoading, isError, isSuccess }] = useRemindMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await remind(formData.email);
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Password was sent to your email');
        } else if (isError) {
            toast.error('', { autoClose: false });
        }
    }, [isSuccess, isError]);

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
                <Input type="email" required name="email" placeholder="Email" value={formData.email} onChange={onChangeHandler} />
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : buttonTitle}</Button>
            </form>
        </StyledForm>
    );
};

export default RemindForm;
