import AbsorbableGridBlockDecorator from './AbsorbableGridBlockDecorator';
import GridBlock from './GridBlock';
import GridCell from './GridCell';

describe(`Absorbable grid block`, () => {
    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    it(`can absorb another grid block's taken cells`, () => {
        const gridBlock = new AbsorbableGridBlockDecorator(new GridBlock({ cols: 3, rows: 3 }));
        
        const absorbedGridBlock1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(gridBlock.absorb(absorbedGridBlock1).toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()]
        ]);

        const absorbedGridBlock2 = new GridBlock([
            [new GridCell(), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(gridBlock.absorb(absorbedGridBlock2).toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()]
        ]);
    });

    test(`can absorb another grid block with specified position`, () => {
        const gridBlock = new AbsorbableGridBlockDecorator(new GridBlock({ cols: 3, rows: 3 }));
        
        const absorbedGridBlock = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(gridBlock.absorb(absorbedGridBlock, { col: 2, row: 2 }).toArray()).toEqual([
            [new GridCell(), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell({ isTaken: true })]
        ]);
    });

    test(`absorption cannot extend absorbable grid block's dimensions`, () => {
        const gridBlock = new AbsorbableGridBlockDecorator(new GridBlock({ cols: 3, rows: 3 }));
        
        const absorbedGridBlock = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(() => gridBlock.absorb(absorbedGridBlock, { col: 3, row: 3 })).toThrow();
    });
});