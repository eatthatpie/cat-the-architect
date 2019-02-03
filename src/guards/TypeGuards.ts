import GameLoopInterface from '@/interfaces/GameLoopInterface';

function isGameLoopInterface(object: any): boolean {
    return 'run' in object && 'stop' in object;
}

export {
    isGameLoopInterface
};