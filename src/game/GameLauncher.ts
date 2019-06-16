import AnimationManager from '@/animation/AnimationManager';
import Gameplay from '@/gameplay/Gameplay';
import GameLoop from '@/game/GameLoop';
import InputManager from '@/input/InputManager';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Renderer from '@/renderer/Renderer';
import ResourceManager from '@/resource/ResourceManager';
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
        systemMediator.registerSystem(new InputManager(systemMediator));
        systemMediator.registerSystem(new ResourceManager(systemMediator));
        systemMediator.registerSystem(new AnimationManager(systemMediator));
        systemMediator.registerSystem(new Gameplay(systemMediator));

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