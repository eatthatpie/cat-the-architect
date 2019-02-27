import BootableInterface from '@/interfaces/BootableInterface';
import ImageResource from './ImageResource';
import ImageResourceInterface from '@/interfaces/ImageResourceInterface';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default class ResourceManager extends MediatorColleagueBase implements BootableInterface  {
    private imageResources: Array<ImageResourceInterface>;

    public boot(config: LauncherConfigInterface) {

    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        
    }

    public shutdown(): void {
        
    }
};