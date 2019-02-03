import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default interface ResponderInterface {
    resolveMessage(mediatorMessage: MediatorMessageInterface): any;
};