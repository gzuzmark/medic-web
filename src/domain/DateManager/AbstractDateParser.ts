export abstract class AbstractDateParser {
    public abstract parseDateToString(date: string, format: string): string;
}
