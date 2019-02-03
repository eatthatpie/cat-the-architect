import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default interface MediatorColleagueInterface {
    notifyMediator(mediatorMessage: MediatorMessageInterface): void;
    retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void;
};