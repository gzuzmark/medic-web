import * as React from 'react';
import * as CircleSelected from '../../../../../assets/images/check-selected.png';
import * as CircleUnselected from '../../../../../assets/images/check-unselected.png';
import * as CircleDisabled from '../../../../../assets/images/check-disabled.png';
import './FilterCalendar.scss';

export interface IFiltercalendarProps {
    title: string;
    isChecked: boolean;
    disabled: boolean;
    onClickButton: (isChecked: boolean) => void
}

const Filtercalendar: React.FC<IFiltercalendarProps> = ({ title, isChecked, disabled = false, onClickButton }) => {

    const onClickCheck = () => {
        if (!disabled) {
            const newCheck = !isChecked;
            onClickButton(newCheck);
        }
    }

    if (disabled) {
        return (
            <div className={'filter-calendar-container filter-calendar-disabled'} onClick={onClickCheck}>
                <img alt={'check'} src={CircleDisabled} height={20} />
                <span className={'filter-calendar-title'}>{ title }</span>
            </div>
        );
    }

    return (
        <div className={'filter-calendar-container'} onClick={onClickCheck}>
            <img alt={'check'} src={isChecked ? CircleSelected : CircleUnselected } height={20} />
            <span className={'filter-calendar-title'}>{ title }</span>
        </div>
    );
};

export default Filtercalendar;
