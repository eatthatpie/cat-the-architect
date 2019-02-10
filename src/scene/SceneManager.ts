import BootableInterface from "@/interfaces/BootableInterface";
import GameBase from "@/game/GameBase";
import LauncherConfigInterface from "@/interfaces/LauncherConfigInterface";
import MediatorColleagueBase from "@/common/MediatorColleagueBase";
import MediatorColleagueInterface from "@/interfaces/MediatorColleagueInterface";
import MediatorInterface from "@/interfaces/MediatorInterface";
import MediatorMessageInterface from "@/interfaces/MediatorMessageInterface";
import Renderer from "@/renderer/Renderer";
import SceneInterface from "@/interfaces/SceneInterface";

export default class SceneManager extends MediatorColleagueBase implements BootableInterface {
    private sceneCollection: Array<SceneInterface>;

    constructor(mediator: MediatorInterface) {
        super(mediator);
        
        this.sceneCollection = [];
    }

    public addScene(scene: SceneInterface) {
        this.sceneCollection.push(scene);
    }
    
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: SceneManager] Starting up...');
        console.log('[DE: SceneManager] Up & running!');
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        if (sender instanceof GameBase && mediatorMessage.recipient === 'SceneManager') {
            if (mediatorMessage.type === 'addScene') {
                this.addScene(mediatorMessage.params[0])
            }
        }

        if (sender instanceof Renderer) {
            if (mediatorMessage.type === 'passEntitiesToRenderer') {
                mediatorMessage.params = this.sceneCollection[0].getEntities();
            }
        }
    }

    public shutdown() {
        console.log('[DE: SceneManager] Shutting down...');
    }
}