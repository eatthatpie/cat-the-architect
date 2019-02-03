import BootableInterface from '@/interfaces/BootableInterface';
import GameLoop from '@/game/GameLoop';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import RendererResponderFactory from '@/renderer/RendererResponderFactory';

export default class Renderer extends MediatorColleagueBase implements BootableInterface {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D; // RendererContext

    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Renderer] Starting up...');

        this.canvas = document.createElement('canvas');
        this.canvas.width = config.width;
        this.canvas.height = config.height;

        this.context = this.canvas.getContext('2d');

        const DOMElement = document.querySelector(config.DOMElementSelector);
        if (!DOMElement) {
            throw new Error(`Query selector ${config.DOMElementSelector} is not a valid DOM element.`);
        }

        DOMElement.appendChild(this.canvas);

        console.log('[DE: Renderer] Up & running!');
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        RendererResponderFactory.createResponderFor(this, sender).resolveMessage(mediatorMessage);
    }

    public onDraw(elapsedTime: number): void {
        this.context.fillStyle = "red";
        this.context.fillRect(0, 0, 300, 150);
        this.context.clearRect(20, 20, 100, 50);

        // this.rendererContext.clearScreen()
        // influence here:
        // (state: - ai manager)
        // (state: - physics manager)
        // - scene manager (-> animation manager)
        // this.entities.forEach(entity => entity.onDraw(elapsedTime)) 

        // scenemanager aktualizuje CAŁKOWICIE encje renderera
        // jeśli scenemanager tego nie robi, renderer zostaje ze starymi encjami (do ustawienia w konfuguracji)
        // aktualizacja encji może oznaczać ich usunięcie
    }

    public onUpdate(elapsedTime: number): void {
        // console.warn('[DE: Renderer] onUpdate method does nothing.')
    }

    public shutdown() {
        console.log('[DE: Renderer] Shutting down...');
    }
};