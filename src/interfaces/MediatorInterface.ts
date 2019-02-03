import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default interface MediatorInterface {
    store(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void;
};