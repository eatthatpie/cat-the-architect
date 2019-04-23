export default interface StoreSubscriberInterface {
    storeData(params: any): any;
    storeDataUpdate(params: any): any
};