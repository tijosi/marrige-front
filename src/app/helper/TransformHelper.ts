export class TransformHelper {

  static objectToFormData(object: any): FormData {

    const formData = new FormData();

    for (const key in object) {

      if (object.hasOwnProperty(key)) {
        formData.append(key, object[key]);
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
