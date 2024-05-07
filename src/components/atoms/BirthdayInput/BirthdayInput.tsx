import { useEffect, useState } from "react";
import DaySelect from "../Input/DaySelect";
import MonthSelect from "../Input/MonthSelect";
import { Month } from "@/ts/MonthType";
import styles from './BirthdayInput.module.scss';

type BirthdayInputProps = {
    onChangeHandler: (value: string | number, key: string) => void;
    months: Array<Month>;
    initialMonthIndex: number;
    initialDay: number;
};

const BirthdayInput: React.FC<BirthdayInputProps> = ({ onChangeHandler, months, initialMonthIndex, initialDay }) => {

    const [selectedMonth, setSelectedMonth] = useState<Month>(months[initialMonthIndex - 1]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedMonthIndex = parseInt(e.target.value);
        const selectedMonth = months[selectedMonthIndex - 1];

        setSelectedMonth(selectedMonth);

        onChangeHandler(selectedMonth.num, 'month');
    };

    const handleDayChange = (value: string | number, key: string) => {
        onChangeHandler(value, 'day');
    }

    return (
        <div className={styles.birthdayInput}>
            <MonthSelect months={months} onChange={handleMonthChange} defaultValue={initialMonthIndex} />
            <DaySelect onChange={handleDayChange} days={selectedMonth.countDates} defaultValue={initialDay} />
        </div>
    )
}

export default BirthdayInput;