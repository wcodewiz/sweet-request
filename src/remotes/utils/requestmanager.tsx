import { DataResources, Models } from './datacenter';
import { deleteRequest, getRequest, postRequest } from './remote';
import { RequestMethod } from './requestypes';

export abstract class RequestManager<T extends DataResources<Models>, E extends object | undefined> {
    protected method: RequestMethod;
    protected url: string;
    protected response: T | null;
    protected form: E;
    protected abstract data(data: any): T;
    protected abstract error(data: any, status?: number): T;

    public constructor(method: RequestMethod, url: string, form: E) {
        this.method = method;
        this.url = url;
        this.form = form;
        this.response = null;
    }
    public async sendRequest(): Promise<DataResources<Models>> {
        switch (this.method) {
            case RequestMethod.POST:
            case RequestMethod.PUT:
                return await postRequest({
                    url: this.url,
                    data: this.form,
                    callback: (json) => {
                        const token = `${json.token}`;
                        if (token !== 'null' && token !== 'undefined' && token !== '') {
                            localStorage.setItem('token', token);
                        }
                        this.response = this.data(json);
                        return this.response;
                    },
                    error: (err, status) => {
                        this.response = this.error(err!.data ?? { message: 'something went wrong!' }, status);
                        return this.response;
                    }
                });
            case RequestMethod.GET:
                return await getRequest({
                    url: this.url,
                    callback: (json) => {
                        const token = `${json.token}`;
                        if (token !== 'null' && token !== 'undefined' && token !== '') {
                            localStorage.setItem('token', token);
                        }
                        this.response = this.data(json);
                        return this.response;
                    },
                    error: (err, status) => {
                        this.response = this.error(err!.data ?? { message: 'something went wrong!' }, status);
                        return this.response;
                    }
                });
            case RequestMethod.DELETE:
                return await deleteRequest({
                    url: this.url,
                    callback: (json) => {
                        this.response = this.data(json);
                        return this.response;
                    },
                    error: (err, status) => {
                        this.response = this.error(err!.data ?? { message: 'something went wrong!' }, status);
                        return this.response;
                    }
                });
        }
    }
}
