import BootableInterface from '@/interfaces/BootableInterface';
import CanvasRenderingContext from '@/renderer/CanvasRenderingContext';
import Color from '@/common/Color';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import RendererResponderFactory from '@/renderer/RendererResponderFactory';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';

export default class Renderer extends MediatorColleagueBase implements BootableInterface {
    private canvas: HTMLCanvasElement;
    private context: RenderingContextInterface;

    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Renderer] Starting up...');

        this.canvas = document.createElement('canvas');
        this.canvas.width = config.width;
        this.canvas.height = config.height;

        this.context = new CanvasRenderingContext(this.canvas);

        const DOMElement = document.querySelector(config.DOMElementSelector);
        if (!DOMElement) {
            throw new Error(`Query selector ${config.DOMElementSelector} is not a valid DOM element.`);
        }

        DOMElement.appendChild(this.canvas);

        console.log('[DE: Renderer] Up & running!');
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        const responder = RendererResponderFactory.createResponderFor(this, sender);
        
        if (responder) {
            responder.resolveMessage(mediatorMessage);
        }
    }

    public onDraw(elapsedTime: number): void {
        this.context.clearScreen(Color.hex('#d9d9d9'));

        // const entities = this.messageCarrier.send('passEntitiesToRenderer');
        let msg = {
            type: 'passEntitiesToRenderer',
            params: []
        };

        this.notifyMediator(msg);

        // Czy context przekazujemy za każdym razem?
        msg.params.forEach(entity => entity.onDraw(this.context, elapsedTime)) 

        // scenemanager aktualizuje CAŁKOWICIE encje renderera
        // jeśli scenemanager tego nie robi, renderer zostaje ze starymi encjami (do ustawienia w konfuguracji)
        // aktualizacja encji może oznaczać ich usunięcie
    }

    public onUpdate(elapsedTime: number): void {
        // console.warn('[DE: Renderer] onUpdate method does nothing.')
    }

    // public drawEntities(entities: Array<any>) {
    //     entities.forEach(entity => {
    //         if (AnimationManager.hasAnimation(entity)) {
    //             entity.drawAnimation();
    //         }
    //         else {
    //             entity.drawStatic();
    //         }
    //     });
    // }

    public shutdown() {
        console.log('[DE: Renderer] Shutting down...');
    }
};