import React from 'react';
import styles from './Date.module.scss';

export type DateProps = {
    month: number;
    day: number;
    date: number;
}

export default function Date({ month, day, date }: DateProps) {

    const [displayMonth, setDisplayMonth] = React.useState('');
    const [displayDay, setDisplayDay] = React.useState('');
    const [displayDate, setDisplayDate] = React.useState(1);

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


    React.useEffect(() => { //컴포넌트가 마운트 되고난 후
        setDisplayMonth(months[month]);
        setDisplayDay(days[day]);
        setDisplayDate(date);
    }, [month, day, date]);

    return (
        <div className={styles.dateClass}>
            <p className={styles.date}>{displayDate}</p>
            <div className={styles.dateMonth}>
                <p>{displayDay}</p>
                <p>{displayMonth}</p>
            </div>
            <div className={styles.toDoList}>
                <p>ToDoList</p>
            </div>
        </div>);
}