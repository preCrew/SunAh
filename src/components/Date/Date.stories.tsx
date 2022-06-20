import Date, { DateProps } from './Date';


/* ------------------------------------------------------------------- */

export default {
    title: 'Component/Date',
    component: Date,
};


export const Sample = ({ month, day, date }: DateProps) => (<Date month={month} day={day} date={date} />);