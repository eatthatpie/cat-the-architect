import BootableInterface from '@/interfaces/BootableInterface';
import GameBase from '@/game/GameBase';
import InputManager from '@/input/InputManager';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorInterface from '@/interfaces/MediatorInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import Renderer from '@/renderer/Renderer';
import SceneInterface from '@/interfaces/SceneInterface';

export default class SceneManager extends MediatorColleagueBase implements BootableInterface {
    private currentScene: SceneInterface;
    private sceneCollection: Array<SceneInterface>;

    constructor(mediator: MediatorInterface) {
        super(mediator);
        
        this.currentScene = null;
        this.sceneCollection = [];
    }

    public addScene(scene: SceneInterface) {
        this.sceneCollection.push(scene);
    }
    
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: SceneManager] Starting up...');
        console.log('[DE: SceneManager] Up & running!');
    }

    public intendTo(scene: SceneInterface) {
        if (this.currentScene) {
            this.currentScene.onLeave();
        }

        scene.onEnter();

        // scene.freeze();

        this.currentScene = scene;
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        if (sender instanceof GameBase && mediatorMessage.recipient === 'SceneManager') {
            if (mediatorMessage.type === 'intendTo') {
                this.intendTo(mediatorMessage.params[0])
            }
        }

        if (sender instanceof Renderer) {
            if (mediatorMessage.type === 'passEntitiesToRenderer') {
                if (this.currentScene !== null) {
                    mediatorMessage.params = this.currentScene.getEntities();
                }
            }
        }

        if (sender instanceof InputManager) {
            if (mediatorMessage.type === 'mouseMove') {
                if (this.currentScene !== null) {
                    this.currentScene.getEntities().forEach(entity => {
                        entity.mouseMove(mediatorMessage.params.mousePosition);
                    });
                }
            }
            else if (mediatorMessage.type === 'mouseClick') {
                if (this.currentScene !== null) {
                    this.currentScene.getEntities().forEach(entity => {
                        entity.mouseClick(mediatorMessage.params.mousePosition);
                    });
                }
            }
        }
    }

    public shutdown() {
        console.log('[DE: SceneManager] Shutting down...');
    }
}