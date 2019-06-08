import StoreInterface from '@/interfaces/StoreInterface';
import StoreSubscriberInterface from '@/interfaces/StoreSubscriberInterface';

export default class StoreSubscription {
    private dispatch: Function;
    private get: Function;
    private moduleGetterPath: string;
    private objectCreatorFunc: Function;
    private subscriber: StoreSubscriberInterface;

    constructor(store: StoreInterface, moduleGetterPath: string) {
        this.dispatch = store.dispatch.bind(store);
        this.get = store.get.bind(store);
        this.moduleGetterPath = moduleGetterPath;
    }

    private getData() {
        return this.objectCreatorFunc(
            this.get(this.moduleGetterPath)
        );
    }

    public getModuleGetterPath(): string {
        return this.moduleGetterPath;
    }

    public to(subscriber: StoreSubscriberInterface, objectCreatorFunc: Function): void {
        this.subscriber = subscriber;
        this.objectCreatorFunc = objectCreatorFunc;

        this.subscriber.storeData({ get: this.get, dispatch: this.dispatch }, this.getData());
    }

    public update(): void {
        this.subscriber.storeDataChange({ get: this.get, dispatch: this.dispatch }, this.getData());
    }
};