import StoreInterface from '@/interfaces/StoreInterface';
import StoreModule from './StoreModule';
import StoreModuleInterface from '@/interfaces/StoreModuleInterface';
import StoreModuleSchemaInterface from '@/interfaces/StoreModuleSchemaInterface';
import StoreSubscriptionInterface from '@/interfaces/StoreSubscriptionInterface';
import StoreSubscription from './StoreSubscription';

// @TODO: this class need huge refactoring
export default class Store implements StoreInterface {
    private modules: Array<StoreModuleInterface>;
    private subscriptions: Array<StoreSubscriptionInterface>;

    constructor() {
        this.modules = [];
        this.subscriptions = [];
    }

    public dispatch(moduleDispatcherPath: string, params: any = {}): any {
        const { moduleName, moduleParam } = this.resolveModulePath(moduleDispatcherPath);

        this.getModule(moduleName).callDispatcher(moduleParam, params);
    }

    public get(moduleGetterPath: string): any {
        const { moduleName, moduleParam } = this.resolveModulePath(moduleGetterPath);

        return this.getModule(moduleName).callGetter(moduleParam);
    }

    public getModule(moduleName: string): StoreModuleInterface {
        return this.modules.filter(item => item.getName() === moduleName)[0];
    }

    public registerModule(name: string, moduleSchema: StoreModuleSchemaInterface): void {
        this.modules.push(new StoreModule(name, moduleSchema));
    }

    private resolveModulePath(modulePath: string): any {
        if (!/^[^\.]+\.[^\.]+$/.test(modulePath)) {
            throw new Error(`Invalid module path.`);
        }

        const pathSegments = modulePath.split('.');

        return {
            moduleName: pathSegments[0],
            moduleParam: pathSegments[1]
        };
    }

    public subscribe(moduleGetterPath: string, objectCreatorFunc: Function): StoreSubscriptionInterface {
        const getter = this.resolveModulePath(moduleGetterPath);
        const subscription = new StoreSubscription(getter(), objectCreatorFunc);

        this.subscriptions.push(subscription);

        return subscription;
    }
};