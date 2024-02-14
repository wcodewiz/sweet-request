import { DataResources, Models } from './datacenter';

export abstract class Usecase<T> {
    protected abstract call(param: T | undefined): Promise<DataResources<Models>>;
}
