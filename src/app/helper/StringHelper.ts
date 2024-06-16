export class StringHelper {

    static isEmpty(value: any): boolean {
        if      (value === null             || value === undefined) return true;
        else if (typeof value === 'string'  && value.trim() === '') return true;
        else if (Array.isArray(value)       && value.length === 0)  return true;

        return false;
    }

}
