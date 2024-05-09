import React from 'react';
import styles from './Input.module.scss';
import { Month } from '@/ts/MonthType';

interface MonthSelectProps {
    months: Month[];
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    defaultValue?: number;
}

const MonthSelect: React.FC<MonthSelectProps> = ({ label, months, onChange, defaultValue }) => {

    return (
        <div>
            {label && <label style={{ marginBottom: '5px', display: 'block' }} htmlFor='month_select'>{label}</label>}
            <select id='month_select' className={styles.select} onChange={onChange} defaultValue={defaultValue}>
                {months.map((month) => (
                    <option key={month.name} value={month.num}>
                        {month.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthSelect;
