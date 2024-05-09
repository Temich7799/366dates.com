import React from 'react';
import styles from './Input.module.scss';

interface DaySelectProps {
    days: number[];
    label?: string;
    onChange: (value: string | number, key: string) => void;
    defaultValue?: number;
}

const DaySelect: React.FC<DaySelectProps> = ({ days, onChange, defaultValue, label }) => {

    return (
        <div>
            {label && <label style={{ marginBottom: '5px', display: 'block' }} htmlFor='day_select'>{label}</label>}
            <select id='day_select' className={styles.select} onChange={(e) => { onChange(e.target.value, 'day') }} defaultValue={defaultValue}>
                {days.map((day, index) => (
                    <option key={index} value={day}>
                        {day}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DaySelect;
