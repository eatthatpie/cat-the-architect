import CurrentBlockEntity from '@/gameplay/entities/CurrentBlockEntity';
import GameBase from '@/game/GameBase';
import GroupEntity from '@/gameplay/entities/GroupEntity';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Scene from '@/scene/Scene';
import Store from '@/store/Store';
import storeModules from '@/gameplay/store/index';
import StoreSubscriberInterface from '@/interfaces/StoreSubscriberInterface';
import { gameStateTickListener } from '@/gameplay/listeners/index';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import GameplayResponderFactory from './GameplayResponderFactory';
import GridBlock from './grid/GridBlock';
import { Direction } from '@/common/Types';

export default class Gameplay extends GameBase implements StoreSubscriberInterface {
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

    public onKeyUp({ code }): void {
        switch (code) {
            case 'ArrowLeft':
                if (
                    !this.store
                        .get('groupEntity.grid')
                        .isCollidingWith(
                            this.store.get('currentBlockEntity.gridBlock'),
                            {
                                row: this.store.get('currentBlockEntity.row'),
                                col: this.store.get('currentBlockEntity.col') - 1
                            }
                        )
                ) {
                    this.store.dispatch('currentBlockEntity.moveHorizontal', {
                        direction: -1
                    });
                }
                
                break;
            case 'ArrowRight':
                if (
                    !this.store
                        .get('groupEntity.grid')
                        .isCollidingWith(
                            this.store.get('currentBlockEntity.gridBlock'),
                            {
                                row: this.store.get('currentBlockEntity.row'),
                                col: this.store.get('currentBlockEntity.col') + 1
                            }
                        )
                ) {
                    this.store.dispatch('currentBlockEntity.moveHorizontal', {
                        direction: 1
                    });
                }
                
                break;
            case 'ArrowDown':
                const gridState = this.store.get('groupEntity.grid');
    
                const { row, col } = gridState
                    .getCollisionPositionWith(
                        this.store.get('currentBlockEntity.gridBlock'),
                        Direction.DOWN,
                        {
                            row: this.store.get('currentBlockEntity.row'),
                            col: this.store.get('currentBlockEntity.col')
                        }
                    );
                    
                // !!DRY violation
                gridState.absorb(this.store.get('currentBlockEntity.gridBlock'), {
                    col,
                    row
                });

                this.store.dispatch('groupEntity.update', {
                    grid: gridState
                });

                this.store.dispatch('currentBlockEntity.reset');

                if (
                    gridState.isCollidingWith(
                        this.store.get('currentBlockEntity.gridBlock'),
                        {
                            col: this.store.get('currentBlockEntity.col'),
                            row: this.store.get('currentBlockEntity.row')
                        }
                    )
                ) {
                    this.store.dispatch('groupEntity.reset');
                    this.store.dispatch('currentBlockEntity.reset');
                }
                
                break;
            case 'Space':
                if (
                    !this.store
                        .get('groupEntity.grid')
                        .isCollidingWith(
                            new GridBlock(
                                this.store
                                    .get('currentBlockEntity.gridBlock')
                                    .getNextRotationArray()
                            ),
                            {
                                row: this.store.get('currentBlockEntity.row'),
                                col: this.store.get('currentBlockEntity.col') + 1
                            }
                        )
                )
                {
                    this.store.dispatch('currentBlockEntity.rotate');
                }

                break;
        }
    }

    public retriveMediatorMessage(
        mediatorMessage: MediatorMessageInterface,
        sender: MediatorColleagueInterface
    ): void {
        const responder = GameplayResponderFactory.createResponderFor(this, sender);
        
        if (responder) {
            responder.resolveMessage(mediatorMessage);
        }
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