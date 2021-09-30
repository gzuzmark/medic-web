import * as React from 'react';
import * as CircleSelected from '../../../../../assets/images/check-selected.png';
import * as CircleUnselected from '../../../../../assets/images/check-unselected.png';
import './FilterCalendar.scss';

export interface IFiltercalendarProps {
    title: string;
    onClickButton: (isChecked: boolean) => void
}

const Filtercalendar: React.FC<IFiltercalendarProps> = ({ title, onClickButton }) => {

    const [isChecked, setIsChecked] = React.useState(true);

    const onClickCheck = () => {
        const newCheck = !isChecked;
        setIsChecked(newCheck);
        onClickButton(newCheck);
    }

    return (
        <div className={'filter-calendar-container'} onClick={onClickCheck}>
            <img alt={'check'} src={isChecked ? CircleSelected : CircleUnselected } height={20} />
            <span className={'filter-calendar-title'}>{ title }</span>
        </div>
    );
};

export default Filtercalendar;
