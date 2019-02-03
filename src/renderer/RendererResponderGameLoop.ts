import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import Renderer from '@/renderer/Renderer';
import ResponderInterface from '@/interfaces/ResponderInterface';

export default class RendererResponderGameLoop implements ResponderInterface {
    private renderer: Renderer;

    constructor (renderer: Renderer) {
        this.renderer = renderer;
    }

    public resolveMessage (mediatorMessage: MediatorMessageInterface) {
        if (mediatorMessage.type === 'onDraw') {
            this.renderer.onDraw(mediatorMessage.params.elapsedTime); // MessageGameLoopOnDraw
        }
        else if (mediatorMessage.type === 'onUpdate') {
            this.renderer.onUpdate(mediatorMessage.params.elapsedTime); // MessageGameLoopOnUpdate
        }
    }
};