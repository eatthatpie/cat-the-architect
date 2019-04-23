import StoreInterface from '@/interfaces/StoreInterface';
import StoreModule from './StoreModule';
import StoreModuleInterface from '@/interfaces/StoreModuleInterface';
import StoreModuleSchemaInterface from '@/interfaces/StoreModuleSchemaInterface';
import StoreSubscriptionInterface from '@/interfaces/StoreSubscriptionInterface';
import StoreSubscription from './StoreSubscription';

export default class Store implements StoreInterface {
    private modules: Array<StoreModuleInterface>;
    private subscriptions: Array<StoreSubscriptionInterface>;

    constructor() {
        this.modules = [];
        this.subscriptions = [];
    }

    public dispatch(moduleDispatcherPath: string, params: any = {}): any {
        const dispatcher = this.resolveModuleDispatcher(moduleDispatcherPath, this.modules);

        // notify all subscribers
        // subscription.update()

        return dispatcher(params);
    }

    public get(moduleGetterPath: string): any {
        const getter = this.resolveModuleGetter(moduleGetterPath, this.modules);

        return getter();
    }

    public registerModule(name: string, moduleSchema: StoreModuleSchemaInterface): void {
        this.modules.push(new StoreModule(moduleSchema));
    }

    private resolveModuleGetter(moduleGetterPath: string, modules: Array<StoreModuleInterface>): Function {
        return () => {}
    }

    private resolveModuleDispatcher(moduleGetterPath: string, modules: Array<StoreModuleInterface>): Function {
        return () => {}
    }

    public subscribe(moduleGetterPath: string, objectCreatorFunc: Function): StoreSubscriptionInterface {
        const getter = this.resolveModuleGetter(moduleGetterPath, this.modules);
        const subscription = new StoreSubscription(getter(), objectCreatorFunc);

        this.subscriptions.push(subscription);

        return subscription;
    }
};