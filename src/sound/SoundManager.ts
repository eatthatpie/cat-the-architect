import BootableInterface from '@/interfaces/BootableInterface';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default class SoundManager extends MediatorColleagueBase implements BootableInterface {
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: SoundManager] Starting up...');
        console.log('[DE: SoundManager] Up & running!');
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {

    }

    public shutdown() {
        console.log('[DE: SoundManager] Shutting down...');
    }
};