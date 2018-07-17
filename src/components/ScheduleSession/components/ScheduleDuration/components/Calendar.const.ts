import { DayOfWeekShape } from 'react-dates';

interface IBaseConfigCalendar {
    daySize: number;
    firstDayOfWeek: DayOfWeekShape;
    hideKeyboardShortcutsPanel: boolean;
    numberOfMonths: number;
    transitionDuration: number;
}

export const BaseConfigCalendar: IBaseConfigCalendar = {
    daySize: 34,
    firstDayOfWeek: 1,
    hideKeyboardShortcutsPanel: true,
    numberOfMonths: 1,
    transitionDuration: 0
};