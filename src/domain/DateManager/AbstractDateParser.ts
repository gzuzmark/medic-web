export abstract class AbstractDateParser {
    public abstract parseDateToString(date: string, format: string): string;
    public abstract isDateToday(date: string): boolean;
}
