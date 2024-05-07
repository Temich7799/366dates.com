import React from 'react';
import { Text } from '@/components/atoms/Text/Text';
import calculateDaysUntilBirthday from '@/utils/calculateDaysUntilBirthday';
import styles from './DaysUntilBirthdayText.module.scss';

type DaysUntilBirthdayProps = {
    birthday: string;
}

const DaysUntilBirthdayText: React.FC<DaysUntilBirthdayProps> = ({ birthday }) => {

    const daysUntil = calculateDaysUntilBirthday(birthday);

    return daysUntil > 0 && <Text tag="p" className={styles.daysUntilText}>{daysUntil} day{daysUntil === 1 ? '' : 's'} until birthday</Text>
};

export default DaysUntilBirthdayText;
