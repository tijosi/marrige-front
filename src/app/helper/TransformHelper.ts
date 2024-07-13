export class TransformHelper {

    static objectToFormData(object: any): FormData {
        const formData: FormData = new FormData();

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] instanceof File) {
                    formData.append(key, object[key]);
                } else if (Array.isArray(object[key])) {
                    formData.append(key, JSON.stringify(object[key]));
                } else if (typeof object[key] === 'object' && object[key] !== null) {
                    formData.append(key, JSON.stringify(object[key]));
                } else {
                    formData.append(key, object[key]);
                }
            }
        }

        return formData;
    }

    static currencyBrlToFloat(currency: any): Number {
        if (!currency) return 0;

        if (currency.search(',')) currency = currency.replace(',', '.');
        if (currency.search('R$')) currency = currency.replace('R$', '');

        return Number(currency);
    }
}
