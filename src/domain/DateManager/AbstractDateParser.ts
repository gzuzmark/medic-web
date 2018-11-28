export abstract class AbstractDateParser {
    public abstract parseDateToString(date: string, format: string): string;
    public abstract isDateToday(date: string): boolean;
    public abstract isSameWeek(date1: string, date2: string): boolean;
}
