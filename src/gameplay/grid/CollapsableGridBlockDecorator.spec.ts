import CollapsableGridBlockDecorator from './CollapsableGridBlockDecorator';
import GridBlock from './GridBlock';
import GridCell from './GridCell';

describe(`Collapsable grid block`, () => {
    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    test(`taken cells above empty cells can go down with gravity (collapse)`, () => {
        const gridBlock = new CollapsableGridBlockDecorator(new GridBlock(
            [
                [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
                [new GridCell({ isTaken: true }), new GridCell(), new GridCell({ isTaken: true })]
            ]
        ));

        gridBlock.collapse();

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell({ isTaken: true })]
            ]
        );
    });

    test(`taken cells with the same type can be removed`, () => {
        const gridBlock = new CollapsableGridBlockDecorator(new GridBlock(
            [
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true, type: 2 }), new GridCell(), new GridCell()],
                [new GridCell({ isTaken: true, type: 2 }), new GridCell({ isTaken: true, type: 2 }), new GridCell({ isTaken: true, type: 1 })]
            ]
        ));

        gridBlock.removeCellsPaths();

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell({ isTaken: true, type: 1 })]
            ]
        );
    });
});