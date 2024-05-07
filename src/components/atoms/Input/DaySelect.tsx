import React from 'react';
import styles from './Input.module.scss';

interface DaySelectProps {
    days: number[];
    onChange: (value: string | number, key: string) => void;
    defaultValue?: number;
}

const DaySelect: React.FC<DaySelectProps> = ({ days, onChange, defaultValue }) => {

    return (
        <select className={styles.select} onChange={(e) => { onChange(e.target.value, 'day') }} defaultValue={defaultValue}>
            {days.map((day, index) => (
                <option key={index} value={day}>
                    {day}
                </option>
            ))}
        </select>
    );
};

export default DaySelect;
