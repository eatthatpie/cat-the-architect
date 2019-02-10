import GameBase from '@/game/GameBase';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Scene from '@/scene/Scene';
import TextAlign from '@/common/flags/TextAlign';
import TextboxEntity from '@/entity/TextboxEntity';
import TextEntity from '@/entity/TextEntity';
import Vector from '@/common/math/Vector';

export default class Game extends GameBase {
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Game] Starting up...');

        const menuScene = new Scene();

        // menuScene.addEntity(
        //     new TextEntity(`продолжать`, new Vector(400, 200))
        // );

        // menuScene.addEntity(
        //     new TextEntity('новая игра', new Vector(400, 230))
        // );

        // menuScene.addEntity(
        //     new TextEntity('выбрать главу', new Vector(400, 260))
        // );

        // menuScene.addEntity(
        //     new TextEntity('лучшие результаты', new Vector(400, 290))
        // );

        menuScene.addEntity(
            new TextEntity('папа', new Vector(400, 320)).setStyle({textAlign:TextAlign.CENTER})
        );

        menuScene.addEntity(
            new TextboxEntity().addTextEntity([
                (new TextEntity(`
                    Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker
                `)).setStyle({
                    textAlign: TextAlign.CENTER
                }),
                (new TextEntity(`
                    Zażółć gęślą jaźń
                `)).setStyle({
                    fontSize: '10px',
                    textAlign: TextAlign.CENTER
                })
            ])
        );

        // this.messageCarrier.send('addScene', menuScene);
        this.notifyMediator({
            recipient: 'SceneManager',
            type: 'addScene',
            params: [
                menuScene
            ]
        });

        console.log('[DE: Game] Up & running!');
    }
};