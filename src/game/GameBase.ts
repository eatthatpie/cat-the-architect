import BootableInterface from '@/interfaces/BootableInterface';
import GameInterface from '@/interfaces/GameInterface';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default class GameBase extends MediatorColleagueBase implements BootableInterface, GameInterface {
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Game] Starting up...');
        console.log('[DE: Game] Up & running!');
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        
    }

    public shutdown(): void {
        console.log('[DE: Game] Shutting down...');
    }
}