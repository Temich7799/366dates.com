import React from 'react';
import styles from './Input.module.scss';
import { Month } from '@/ts/MonthType';

interface MonthSelectProps {
    months: Month[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    defaultValue?: number;
}

const MonthSelect: React.FC<MonthSelectProps> = ({ months, onChange, defaultValue }) => {

    return (
        <select className={styles.select} onChange={onChange} defaultValue={defaultValue}>
            {months.map((month) => (
                <option key={month.name} value={month.num}>
                    {month.name}
                </option>
            ))}
        </select>
    );
};

export default MonthSelect;
