import * as moment from "moment";
import {AbstractDateParser} from "./AbstractDateParser";

export class MomentDateParser extends AbstractDateParser {
    public parseDateToString(date: string, format: string) {
        const d = moment(date);
        return d.format(format);
    }

    public isDateToday(date: string): boolean {
        const d = moment(date);
        const t = moment();
        return d.format("YYYY-MM-DD") === t.format("YYYY-MM-DD");
    }

    public isSameDate(date1: string, date2: string): boolean {
        const d = moment(date1);
        const t = moment(date2);
        return d.format("YYYY-MM-DD") === t.format("YYYY-MM-DD");
    }

    public isSameWeek(firstDay: string, secondDay: string): boolean {
        const firstMoment = moment(firstDay);
        const secondMoment = moment(secondDay);

        const startOfWeek = (date: moment.Moment, offset: number) => {
            return date.add( date.weekday() * -1 + (date.weekday() >= 7 + offset ? 7 + offset : offset), "days");
        };
        return startOfWeek(firstMoment, -6).isSame(startOfWeek(secondMoment, -6), "day");

    }
}
