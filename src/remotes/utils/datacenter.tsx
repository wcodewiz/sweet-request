export abstract class DataResources<T> {
    public success: T | undefined;
    public err: T | undefined;
}

export abstract class Models {}

export class DataSucces<T> extends DataResources<T> {
    constructor(data: T) {
        super();
        this.success = data;
    }
}

export class DataException<T> extends DataResources<T> {
    constructor(data: T) {
        super();
        this.err = data;
    }
}

export abstract class Failures extends Error {
    public code?: number;
    public message: string;
    constructor(message: string, code = 0) {
        super(message);
        this.name = 'Server Failure';
        this.code = code;
        this.message = message;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static parseError(errordata: any, status: number) {
        let error = '';
        if (errordata instanceof Array) {
            error = errordata[0];
        } else if (errordata instanceof Object) {
            for (const i in errordata) {
                error = `${errordata[i]}`;
                break;
            }
        } else {
            error = errordata;
        }

        switch (status) {
            case 100:
            case 101:
            case 200:
                return new NetworkFailure(error);
            case 404:
                return new NotFoundFailure(error);
            case 400:
            case 403:
                return new ForbiddenFailure(error);
            case 401:
                return new AuthFailure(error);
            case 500:
                return new ServerFailure(error);
            default:
                return new NetworkFailure(error);
        }
    }
}

class ServerFailure extends Failures {
    constructor(message = 'internal sever error') {
        super(message, 500);
    }
}

class NotFoundFailure extends Failures {
    constructor(message = 'Not found') {
        super(message, 404);
    }
}

class ForbiddenFailure extends Failures {
    constructor(message = 'access forbidden') {
        super(message, 403);
    }
}

class AuthFailure extends Failures {
    constructor(message = 'Not authenticated') {
        super(message, 401);
    }
}
class NetworkFailure extends Failures {
    constructor(message = 'Network connection fails') {
        super(message, 100);
    }
}
