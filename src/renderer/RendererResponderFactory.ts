import GameLoop from '@/game/GameLoop';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import Renderer from '@/renderer/Renderer';
import RendererResponderGameLoop from '@/renderer/RendererResponderGameLoop';

export default class RendererResponderFactory {
    public static createResponderFor(renderer: Renderer, sender: MediatorColleagueInterface) {
        if (sender instanceof GameLoop) {
            return new RendererResponderGameLoop(renderer);
        }
    }
};