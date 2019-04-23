import StoreSubscriberInterface from '@/interfaces/StoreSubscriberInterface';

export default class StoreSubscription {
    private data: any;

    constructor(data: any, objectCreatorFunc: Function) {
        this.data = objectCreatorFunc(data);
    }

    public to(entity: StoreSubscriberInterface): void {
        entity.storeData(this.data);
    }

    public update(): void {
        
    }
};