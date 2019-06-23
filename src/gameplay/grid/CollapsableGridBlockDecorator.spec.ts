import CollapsableGridBlockDecorator from './CollapsableGridBlockDecorator';
import GridBlock from './GridBlock';
import GridCell from './GridCell';

describe(`Collapsable grid block`, () => {
    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    test(`cells with the same type in the same row indicates that the block is collapsable`, () => {
        const gridBlock1 = new CollapsableGridBlockDecorator(new GridBlock(
            [
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ],
                [
                    new GridCell({ isTaken: true, type: 2 }),
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 })
                ],
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ]
            ]
        ));

        expect(gridBlock1.isCollapsable()).toBeFalsy();

        const gridBlock2 = new CollapsableGridBlockDecorator(
            new GridBlock([
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ],
                [
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 })
                ],
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ]
            ]
        ));

        expect(gridBlock2.isCollapsable()).toBeTruthy();
    });

    test(`cells with the same type in collapsable block can be removed and cause other taken cells to collapse`, () => {
        const gridBlock = new CollapsableGridBlockDecorator(new GridBlock(
            [
                [
                    new GridCell({ isTaken: true, type: 2 }),
                    new GridCell(),
                    new GridCell()
                ],
                [
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 })
                ],
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ]
            ]
        ));

        gridBlock.collapse();

        expect(gridBlock.toArray()).toEqual([
            [new GridCell(), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()],
            [new GridCell({ isTaken: true, type: 2 }), new GridCell(), new GridCell()]
        ]);
    });
});