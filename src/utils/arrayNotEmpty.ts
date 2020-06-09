export function arrayNotEmpty(o: unknown): o is unknown[] {
    return Array.isArray(o) && o.length > 0;
}
