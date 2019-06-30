import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';
import Renderer from '@/renderer/Renderer';
import ResponderInterface from '@/interfaces/ResponderInterface';
import Gameplay from './Gameplay';

export default class GameplayResponderInputManager implements ResponderInterface {
    private gameplay: Gameplay;

    constructor (gameplay: Gameplay) {
        this.gameplay = gameplay;
    }

    public resolveMessage(mediatorMessage: MediatorMessageInterface) {
        if (mediatorMessage.type === 'keyUp') {
            this.gameplay.onKeyUp(mediatorMessage.params);
        }
    }
};