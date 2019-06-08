export default interface StoreInterface {
    dispatch(moduleGetterPath: string, params?: any): any;
    get(moduleGetterPath: string, params?: any): any;
};