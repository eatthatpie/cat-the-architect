import Game from '@/game/Game';
import GameLoop from '@/game/GameLoop';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Renderer from '@/renderer/Renderer';
import SceneManager from '@/scene/SceneManager';
import SoundManager from '@/sound/SoundManager';
import SystemMediator from '@/system/SystemMediator';

export default class GameLauncher {
    public static launch(config: LauncherConfigInterface): void {
        const systemMediator = new SystemMediator();

        systemMediator.setConfig(config);

        systemMediator.registerSystem(new SceneManager(systemMediator));
        systemMediator.registerSystem(new GameLoop(systemMediator));
        systemMediator.registerSystem(new Renderer(systemMediator));
        systemMediator.registerSystem(new SoundManager(systemMediator));
        systemMediator.registerSystem(new Game(systemMediator));

        try {
            systemMediator.bootSystems();
            systemMediator.getGameLoop().run();

            console.log('[Dizzy Engine] Game is on!');
        }
        catch(e) {
            console.error(e);
        }
    }
};