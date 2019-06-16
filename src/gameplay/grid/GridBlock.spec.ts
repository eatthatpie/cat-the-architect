import GridBlock from './GridBlock';
import GridCell from './GridCell';

describe(`Grid block`, () => {
    it(`is two dimensional array`, () => {
        const gridBlock = new GridBlock();

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell()]
            ]
        );
    });

    test(`the two dimensional array can have custom size`, () => {
        const gridBlock = new GridBlock({ cols: 3, rows: 4 });

        expect(gridBlock.toArray()).toEqual(
            [
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell()],
                [new GridCell(), new GridCell(), new GridCell()]
            ]
        );
    });
});