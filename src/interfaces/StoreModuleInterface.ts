export default interface StoreModuleInterface {
    callDispatcher(name: string, params: any): void;
    callGetter(name: string): any;
    getName(): string;
};