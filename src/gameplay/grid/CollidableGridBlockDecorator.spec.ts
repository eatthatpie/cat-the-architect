import CollidableGridBlockDecorator from './CollidableGridBlockDecorator';
import GridBlock from './GridBlock';
import GridCell from './GridCell';
import Vector from '../../common/math/Vector'

describe(`Collidable grid block`, () => {
    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    test(`taken cells can collide with other grid block's taken cells`, () => {
        const gridBlock = new CollidableGridBlockDecorator(new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()]
        ]));
        
        const collidingGridBlock1 = new GridBlock([
            [new GridCell(), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        expect(gridBlock.isCollidingWith(collidingGridBlock1)).toBeFalsy();

        const collidingGridBlock2 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell()]
        ]);

        expect(gridBlock.isCollidingWith(collidingGridBlock2, { col: 2, row: 2 })).toBeTruthy();
    });

    it(`can predict grid block's collision position for vertical or horizontal vector`, () => {
        const gridBlock = new CollidableGridBlockDecorator(new GridBlock([
            [new GridCell(), new GridCell(), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell(), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell(), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell(), new GridCell()]
        ]));

        const collidingGridBlock = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell()]
        ]);

        expect(gridBlock.getCollisionPositionWith(collidingGridBlock, new Vector(0, 1), { col: 2, row: 1 })).toEqual(
            [
                [new GridCell(), new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true }), new GridCell(), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell(), new GridCell()]
            ]
        );
    });
});