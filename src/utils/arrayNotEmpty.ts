export function arrayNotEmpty(o: any): o is any[] {
    return Array.isArray(o) && o.length > 1;
}
