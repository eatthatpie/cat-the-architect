import Game from '@/game/Game';
import GameLoop from '@/game/GameLoop';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Renderer from '@/renderer/Renderer';
import SoundManager from '@/sound/SoundManager';

export default class GameLauncher {
    public static launch(config: LauncherConfigInterface): void {
        const game = new Game();

        game.setConfig(config);

        // @TODO: the order here is important; shout it be like that?
        game.registerSystem(new GameLoop(game));
        game.registerSystem(new Renderer(game));
        game.registerSystem(new SoundManager(game));

        try {
            game.bootSystems();
            game.getGameLoop().run();

            console.log('[Dizzy Engine] Game is on!');
        }
        catch(e) {
            console.error(e);
        }

        // game.getGameLoop().stop();
        // game.shutdownSystems();
    }
};