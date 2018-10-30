import * as moment from "moment";
import {AbstractDateParser} from "./AbstractDateParser";

export class MomentDateParser extends AbstractDateParser {
    public parseDateToString(date: string, format: string) {
        const d = moment(date);
        return d.format(format);
    }
}