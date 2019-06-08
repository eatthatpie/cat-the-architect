import StoreSubscriberInterface from '@/interfaces/StoreSubscriberInterface';

export default interface StoreSubscriptionInterface {
    getModuleGetterPath(): string;
    to(subscriber: StoreSubscriberInterface, objectCreatorFunc: Function): any;
    update(): any;
};