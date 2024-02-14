/* eslint-disable @typescript-eslint/ban-ts-comment */
import { requestProp } from './remote';

export class AppUtils {
    public static parseForm(input: requestProp): FormData {
        const form = new FormData();
        //@ts-ignore
        if (!(input.data?.data instanceof FormData)) {
            for (const i in input.data) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const field = input.data[i];
                if (field instanceof File) {
                    form.append(`${i}`, field);
                } else if (!(field instanceof Object) && !(field instanceof Function) && field !== '') {
                    form.append(`${i}`, field);
                }
            }
            return form;
        }
        //@ts-ignore
        return input.data.data;
    }
}
