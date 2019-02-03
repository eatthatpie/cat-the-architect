import BootableInterface from '@/interfaces/BootableInterface';
import GameLoopInterface from '@/interfaces/GameLoopInterface';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorInterface from '@/interfaces/MediatorInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default class GameLoop extends MediatorColleagueBase implements GameLoopInterface, BootableInterface {
    private lastIterationTime: number;
    private nextAnimationFrameRequestId: number;

    constructor(mediator: MediatorInterface) {
        super(mediator);

        window.requestAnimationFrame = window.requestAnimationFrame
            // || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            // || window.msRequestAnimationFrame
            || function (callback) { 
                return setTimeout(callback, 1000/60) 
            }
        
        window.cancelAnimationFrame = window.cancelAnimationFrame
            // || window.mozCancelAnimationFrame
            || function (timeoutId) {
                clearTimeout(timeoutId)
            }
    }

    public boot(config: LauncherConfigInterface): void {

    }

    public run(): void {
        this.nextAnimationFrameRequestId = window.requestAnimationFrame(this.loop.bind(this));

        console.log('[DE: GameLoop] Running...');
    }

    public loop(): void {
        const iterationElapsedTime = this.getIterationElapsedTimeOnce();

        this.update(iterationElapsedTime);
        this.draw(iterationElapsedTime);

        this.nextAnimationFrameRequestId = window.requestAnimationFrame(this.loop.bind(this));
    }

    public draw(iterationElapsedTime: number): void {
        this.notifyMediator({
            type: 'onDraw',
            params: {
                elapsedTime: iterationElapsedTime
            }
        });
    }

    public update(iterationElapsedTime: number): void {
        this.notifyMediator({
            type: 'onUpdate',
            params: {
                elapsedTime: iterationElapsedTime
            }
        });
    }

    public getIterationElapsedTimeOnce(): number {
        const currentIterationTime = new Date().getTime();
        const iterationElapsedTime = currentIterationTime - this.lastIterationTime;

        this.lastIterationTime = currentIterationTime;

        return iterationElapsedTime;
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {

    }

    public stop(): void {
        window.cancelAnimationFrame(this.nextAnimationFrameRequestId);
    }

    public shutdown(): void {
        
    }
};