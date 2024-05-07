'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button/Button';
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import StyledForm from '@/components/molecules/StyledForm/StyledForm';
import { useLoginMutation } from '@/lib/redux/api/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginFormProps = {
    buttonTitle: string;
    registerButtonTitle: string;
    placeholders: {
        passwordPlaceholder?: string;
    }
}

const LoginForm: React.FC<LoginFormProps> = ({ buttonTitle, registerButtonTitle, placeholders = {} }) => {

    const { language } = useLanguageContext();

    const router = useRouter();

    const [formData, setFormData] = useState<{ email: string; password: string }>({ email: '', password: '' });

    const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (isLoading) {
            toast.info('Logging in...', { autoClose: false });
        } else if (isSuccess) {
            toast.success('Login successful!');
            router.push(`/user/${data.userId}`);
        } else if (isError) {
            toast.error('Error: Incorrect email or password', { autoClose: false });
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChangeHandler} />
                <Input type="password" name="password" placeholder={placeholders.passwordPlaceholder} value={formData.password} onChange={onChangeHandler} />
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : buttonTitle}</Button>
                <Link href="/auth/sign-up"><Button>{registerButtonTitle}</Button></Link>
            </form>
        </StyledForm>
    );
};

export default LoginForm;
