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
}
