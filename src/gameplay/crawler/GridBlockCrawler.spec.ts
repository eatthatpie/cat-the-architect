import GridBlockCrawler from './GridBlockCrawler';
import GridBlock from '../grid/GridBlock';
import GridCell from '../grid/GridCell';

describe(`Grid Block Crawler`, () => {
    describe(`cell crawling`, () => {
        let gbc;

        beforeEach(() => {
            gbc = new GridBlockCrawler(new GridBlock([
                [
                    new GridCell(),
                    new GridCell(),
                    new GridCell()
                ],
                [
                    new GridCell(),
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell()
                ],
                [
                    new GridCell({ isTaken: true, type: 2 }),
                    new GridCell({ isTaken: true, type: 1 }),
                    new GridCell({ isTaken: true, type: 1 })
                ]
            ]));
        });

        it(`finds adjacent grid cells with the same type`, () => {
            expect(gbc.neighs({ col: 2, row: 3 })).toEqual([
                { col: 2, row: 2 },
                { col: 3, row: 3 }
            ]);
        });

        it(`finds next not ignored cell moving from top to bottom, left to right`, () => {
            gbc.addIgnoredCell({ col: 1, row: 1 });
            gbc.addIgnoredCell({ col: 2, row: 1 });
            gbc.addIgnoredCell({ col: 1, row: 2 });

            expect(gbc.getNextCell()).toEqual({ col: 3, row: 1 });

            gbc.addIgnoredCell({ col: 3, row: 1 });

            expect(gbc.getNextCell()).toEqual({ col: 2, row: 2 });
        });
    });
});