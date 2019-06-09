import CurrentBlockEntity from '@/game/entities/CurrentBlockEntity';
import GameBase from '@/game/GameBase';
import GroupEntity from '@/game/entities/GroupEntity';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Scene from '@/scene/Scene';
import Store from '@/store/Store';
import storeModules from '@/game/store/index';
import StoreSubscriberInterface from '@/interfaces/StoreSubscriberInterface';
import { gameStateTickListener } from '@/game/listeners/index';

export default class Game extends GameBase implements StoreSubscriberInterface {
    private currentScene: string;
    private scenes: any;
    private store: Store;

    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Game] Starting up...');

        this.initStore();

        this.scenes = {
            intro: new Scene(),
            menu: new Scene(),
            game: new Scene()
        };
        
        const groupEntity = new GroupEntity();
        const currentBlockEntity = new CurrentBlockEntity();

        this.scenes.game.addEntity(groupEntity);
        this.scenes.game.addEntity(currentBlockEntity);

        this.store
            .subscribe('scene.current')
            .to(this, data => {
                return {
                    currentScene: data
                };
            });

        this.store
            .subscribe('currentBlockEntity.state')
            .to(currentBlockEntity, data => { 
                return {
                    state: data
                }; 
            });
        
        this.store
            .subscribe([
                'groupEntity.state',
                'currentBlockEntity.state'
            ])
            .to(groupEntity, data => {
                return {
                    state: data.groupEntity.state,
                    currentBlockEntity: data.currentBlockEntity.state
                };
            });

        // This should be fired only on game mode (scene == game)
        setInterval(() => {
            this.store.dispatch('gameState.tick');
        }, 1000);

        this.store
            .subscribe('gameState.tick')
            .to(gameStateTickListener, data => {
                return {
                    currentBlockIsAbleToGoDown: data.currentBlockIsAbleToGoDown
                };
            });

        console.log('[DE: Game] Up & running!');
    }

    private initStore(): void {
        this.store = new Store();

        Object.keys(storeModules).forEach(moduleName => {
            this.store.registerModule(moduleName, storeModules[moduleName]);
        });
    }

    public storeData({ get, dispatch }, { currentScene }): void {
        this.intendToScene(currentScene);
    }

    public storeDataChange({ get, dispatch }, { currentScene }): void {
        if (currentScene === this.currentScene) {
            return;
        }

        this.intendToScene(currentScene);
    }

    private intendToScene(sceneName: string): void {
        if (!this.scenes.hasOwnProperty(sceneName)) {
            throw new Error(`The scene named ${sceneName} is not defined.`);
        }

        const scene = this.scenes[sceneName];

        this.notifyMediator({
            recipient: 'SceneManager',
            type: 'intendTo',
            params: [scene]
        });

        console.log(`[Dizzy Game] Scene changed from ${this.currentScene} to ${sceneName}.`);

        this.currentScene = sceneName;
    }
};