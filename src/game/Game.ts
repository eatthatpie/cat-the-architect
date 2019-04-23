import GameBase from '@/game/GameBase';
import LauncherConfigInterface from '@/interfaces/LauncherConfigInterface';
import Rect from '@/common/math/Rect';
import Scene from '@/scene/Scene';
import SpriteEntity from '@/entity/SpriteEntity';
import TextAlign from '@/common/flags/TextAlign';
import TextEntity from '@/entity/TextEntity';
import Vector from '@/common/math/Vector';

export default class Game extends GameBase {
    public boot(config: LauncherConfigInterface): void {
        console.log('[DE: Game] Starting up...');

        const menuScene = new Scene();
        const menuScene2 = new Scene();

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

        // @IDEA: STORE IDEA

        // Store.dispatch('entities.moveCurrentBlock', {})
        // Store.get('entities.currentBlock');
        // Store.subscribe('entities.currentBlock').to(SpriteEntity, data => {
        //     return {
        //         test: data.value,
        //         secondValue: 0
        //     }
        // });

        // Store.registerModule('entities', {
        //     state: {

        //     },
        //     dispatchers: {
        //         moveCurrentBlock() {

        //         }
        //     },
        //     getters: {
        //         currentBlock() {

        //         }
        //     }
        // });

        menuScene.addEntity(
            new SpriteEntity(
                '/assets/backgrounds/example.jpg', 
                new Rect(new Vector(0, 0), new Vector(800, 600)), 
                new Rect(new Vector(0, 0), new Vector(800, 600))
            )
                // .onUpdate(elapsedTime => {
                //     if (gameState.currentBlockWillGoDown) {
                //         if (currentBlockEntity.position vs groupBlock.position is ok) {
                //             Messanger.AnimationManager.play('current.down', this, { params })
                //                 .onEnd(() => {
                //                     this.updatePosition();
                //                 })
                //         }
                //         else {
                //             groupEntity.addBlocks(...)

                //             if (groupEntity.isDestroyable()) {
                //                 AnimationManagerMessanger.play('remove.items', groupEntity, { params })
                //                     .onEnd(() => {
                //                         groupEntity.updateGroup();
                //                         gameState.updateScore(); // global store
                //                         currentBlockEntity.reset(gameState.next);
                //                     })
                //             }
                //             else if (groupEntity.isKilling()) {
                //                 AnimationManagerMessanger.play('game.over')
                //                     .onEnd(() => {
                //                         DialogEntity.open({ params })
                //                             .onClose(() => {
                //                                 SceneManagerMessanger.intendScene(menuScene)
                //                             })
                //                     })
                //             }
                //             else {
                //                 groupEntity.updateGroup();
                //                 currentBlockEntity.reset(gameState.next);
                //             }
                //         }
                //     }
                //     else if (gameState.kotPsot()) {
                //         ...
                //     }
                // })
        );

        menuScene.addEntity(
            new TextEntity('AbcDefGhi', new Vector(400, 100))
                .setStyle({ 
                    textAlign: TextAlign.LEFT,
                    fontSize: 20,
                    lineHeight: 20
                })
                .onMouseClick(mousePosition => {
                    this.notifyMediator({
                        recipient: 'SceneManager',
                        type: 'intendTo',
                        params: [
                            menuScene2
                        ]
                    });
                })
                .onMouseOver(mousePosition => {
                    console.log('im over papa text entity!');
                })
                .onMouseOut(mousePosition => {
                    console.log('im out papa text entity!');
                })
        );

        // menuScene.addEntity(
        //     new TextboxEntity().addTextEntity([
        //         (new TextEntity(`
        //             Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker
        //         `)).setStyle({
        //             textAlign: TextAlign.CENTER
        //         }),
        //         (new TextEntity(`
        //             Zażółć gęślą jaźń
        //         `)).setStyle({
        //             fontSize: 10,
        //             textAlign: TextAlign.CENTER
        //         })
        //     ])
        // );

        menuScene2.addEntity(
            new TextEntity('Test', new Vector(400, 320))
                .setStyle({ textAlign: TextAlign.CENTER })
                .onMouseClick(mousePosition => {
                    this.notifyMediator({
                        recipient: 'SceneManager',
                        type: 'intendTo',
                        params: [
                            menuScene
                        ]
                    });
                })
        );

        // this.messageCarrier.send('addScene', menuScene);
        this.notifyMediator({
            recipient: 'SceneManager',
            type: 'intendTo',
            params: [
                menuScene
            ]
        });

        // setTimeout(() => {
        //     this.notifyMediator({
        //         recipient: 'SceneManager',
        //         type: 'intendTo',
        //         params: [
        //             menuScene2
        //         ]
        //     });
        // }, 2000);

        console.log('[DE: Game] Up & running!');
    }
};