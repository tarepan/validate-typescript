export function isIso8601(value: string): boolean {
    let utcMs = Date.parse(value);
    return (!Number.isNaN(utcMs) && (value === (new Date(utcMs)).toISOString()));
}