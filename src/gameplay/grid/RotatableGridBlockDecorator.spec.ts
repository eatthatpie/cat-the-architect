import GridBlock from './GridBlock';
import GridCell from './GridCell';
import RotatableGridBlockDecorator from './RotatableGridBlockDecorator';

describe(`Rotatable grid block`, () => {
    test(`taken cells are defined by rotation step`, () => {
        // @TODO: what about the type?
        const gridBlock = new RotatableGridBlockDecorator(new GridBlock({ cols: 3, rows: 4 }));

        gridBlock.addRotationStep(
            [
                { row: 1, col: 1 },
                { row: 2, col: 2 },
                { row: 3, col: 3 }
            ]
        );

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell(), new GridCell()]
            ]
        );
    });

    test(`the rotation steps are looped`, () => {
        const gridBlock = new RotatableGridBlockDecorator(new GridBlock({ cols: 2, rows: 3 }));

        gridBlock.addRotationStep(
            [
                { row: 1, col: 1 },
                { row: 2, col: 2 }
            ]
        );

        gridBlock.addRotationStep(
            [
                { row: 1, col: 2 },
                { row: 3, col: 2 }
            ]
        );

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell({ isTaken: true }), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell()]
            ]
        );

        gridBlock.rotate();

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true })]
            ]
        );

        gridBlock.rotate();

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell({ isTaken: true }), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell()]
            ]
        );
    });

    test(`the next rotation step can be previewed`, () => {
        const gridBlock = new RotatableGridBlockDecorator(new GridBlock({ cols: 2, rows: 3 }));

        gridBlock.addRotationStep(
            [
                { row: 1, col: 1 },
                { row: 2, col: 2 }
            ]
        );

        gridBlock.addRotationStep(
            [
                { row: 1, col: 2 },
                { row: 3, col: 2 }
            ]
        );

        expect(gridBlock.getNextRotationArray()).toEqual(
            [
                [new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true })]
            ]
        );

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell({ isTaken: true }), new GridCell()],
                [new GridCell(), new GridCell({ isTaken: true })],
                [new GridCell(), new GridCell()]
            ]
        );
    });
});