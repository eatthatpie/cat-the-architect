import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import Gameplay from './Gameplay';
import InputManager from '@/input/InputManager';
import GameplayResponderInputManager from './GameplayResponderInputManager';

export default class GameplayResponderFactory {
    public static createResponderFor(gameplay: Gameplay, sender: MediatorColleagueInterface) {
        if (sender instanceof InputManager) {
            return new GameplayResponderInputManager(gameplay);
        }
    }
};