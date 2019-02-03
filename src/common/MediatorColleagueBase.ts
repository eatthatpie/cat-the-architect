import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorInterface from '@/interfaces/MediatorInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default abstract class MediatorColleagueBase implements MediatorColleagueInterface {
    private mediator: MediatorInterface;

    constructor(mediator: MediatorInterface) {
        this.mediator = mediator;
    }

    public notifyMediator(mediatorMessage: MediatorMessageInterface): void {
        this.mediator.store(mediatorMessage, this);
    }

    public abstract retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void;
};