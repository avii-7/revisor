export function relativeTime(iso8601: string): string {
    const date = new Date(iso8601);
    const now = new Date();

    const seconds = Math.round((date.getTime() - now.getTime()) / 1000);

    const intervals = [
        { unit: "year", seconds: 60 * 60 * 24 * 365 },
        { unit: "month", seconds: 60 * 60 * 24 * 30 },
        { unit: "week", seconds: 60 * 60 * 24 * 7 },
        { unit: "day", seconds: 60 * 60 * 24 },
        { unit: "hour", seconds: 60 * 60 },
        { unit: "minute", seconds: 60 },
        { unit: "second", seconds: 1 },
    ] as const;

    const formatter = new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
    });

    for (const interval of intervals) {
        const value = Math.round(seconds / interval.seconds);

        if (Math.abs(value) >= 1) {
            return formatter.format(value, interval.unit);
        }
    }

    return "just now";
}