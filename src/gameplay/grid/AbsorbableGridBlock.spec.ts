import AbsorbableGridBlock from './AbsorbableGridBlock';
import GridBlock from './GridBlock';
import GridCell from './GridCell';

describe(`Absorbable grid block`, () => {
    it(`can absorb another grid block's taken cells`, () => {
        const gridBlock = new AbsorbableGridBlock({ cols: 3, rows: 3 });
        
        const absorbedGridBlock1 = new GridBlock({}, [
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(gridBlock.absorb(absorbedGridBlock1).toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()]
        ]);

        const absorbedGridBlock2 = new GridBlock({}, [
            [new GridCell(), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell({ isTaken: true })]
        ]);

        expect(gridBlock.absorb(absorbedGridBlock2).toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell(), new GridCell()]
        ]);
    });

    // test(`can absorb another grid block with specified position`, () => {});

    // test(`absorption cannot extend absorbable grid block's dimensions`, () => {})

    // test(`taken cells can collide with other grid block's taken cells`, () => {});

    // it(`can predict absorbed grid block's collision point`, () => {});
});