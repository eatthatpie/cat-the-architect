import BootableInterface from '@/interfaces/BootableInterface';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorInterface from '@/interfaces/MediatorInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import Vector from '@/common/math/Vector';

export default class InputManager extends MediatorColleagueBase implements BootableInterface {
    private mousePosition: Vector;

    constructor(mediator: MediatorInterface) {
        super(mediator);
        
        this.mousePosition = new Vector();
    }

    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: InputManager] Starting up...');

        window.addEventListener('click', this.handleMouseClick.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        console.log('[DE: InputManager] Up & running!');
    }

    protected handleMouseClick(event: MouseEvent): void {
        this.mousePosition.x = event.clientX - 8;
        this.mousePosition.y = event.clientY - 8;

        this.notifyMediator({
            type: 'mouseClick',
            params: {
                mousePosition: this.mousePosition
            }
        });
    }

    protected handleKeyUp(event: KeyboardEvent): void {
        this.notifyMediator({
            type: 'keyUp',
            params: {
                code: event.code,
                key: event.key
            }
        });
    }

    protected handleMouseMove(event: MouseEvent): void {
        this.mousePosition.x = event.clientX - 8;
        this.mousePosition.y = event.clientY - 8;

        this.notifyMediator({
            type: 'mouseMove',
            params: {
                mousePosition: this.mousePosition
            }
        });
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {

    }

    public shutdown() {
        console.log('[DE: InputManager] Shutting down...');
    }
}