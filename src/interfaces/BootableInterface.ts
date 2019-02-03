import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';

export default interface BootableInterface {
    boot(config: LauncherConfigInterface): any;
    shutdown(): void;
};