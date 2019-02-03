import BootableInterface from '@/interfaces/BootableInterface';
import GameLoop from '@/game/GameLoop';
import GameLoopInterface from '@/interfaces/GameLoopInterface';
import { isGameLoopInterface } from '@/guards/TypeGuards';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import MediatorInterface from '@/interfaces/MediatorInterface';
import MediatorColleagueBase from '@/common/MediatorColleagueBase';
import MediatorColleagueInterface from '@/interfaces/MediatorColleagueInterface';
import MediatorMessageInterface from '@/interfaces/MediatorMessageInterface';

export default class Game implements MediatorInterface {
    private config: LauncherConfigInterface;
    private systems: Array<BootableInterface & MediatorColleagueInterface>;

    constructor() {
        this.config = null;
        this.systems = [];
    }

    public bootSystems(): void {
        if (!this.config) {
            throw new Error(`Cannot boot game systems if config is not set.`);
        }

        this.systems.forEach(system => {
            system.boot(this.config);
        });
    }

    public getGameLoop(): any {
        // @TODO: come up with better idea on interface check
        // @TODO: allow only one instance of GameLoopInterface in systems array
        const gameLoopSystems = this.systems.filter(system => {
            return isGameLoopInterface(system);
        })

        return gameLoopSystems.length === 1 ? gameLoopSystems[0] : null;
    }

    public getGameSystems(): Array<BootableInterface & MediatorColleagueInterface> {
        return this.systems;
    }

    public registerSystem(system: BootableInterface & MediatorColleagueInterface): void {
        this.systems.push(system); 
    }

    public setConfig(config: LauncherConfigInterface): void {
        this.config = config;
    }

    public shutdownSystems(): void {
        this.systems.forEach(system => {
            system.shutdown();
        })
    }

    public store(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        this.systems.forEach(system => {
            if (system !== sender) {
                system.retriveMediatorMessage(mediatorMessage, sender);
            }
        });
    }
};