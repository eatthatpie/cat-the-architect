import GridBlock from './GridBlock';
import GridBlockMatcher from './GridBlockMatcher';
import GridCell from './GridCell';

describe(`Grid Block Matcher`, () => {
    let gbm: GridBlockMatcher;

    beforeEach(() => {
        gbm = new GridBlockMatcher();
    });

    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    it(`generates sum of blocks' taken cells mapped on the first block`, () => {
        const block1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        const block2 = new GridBlock([
            [new GridCell(), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell()]
        ]);

        const block3 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell()]
        ]);

        const block4 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        gbm.match(block1, block2);

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        gbm.match(block3, block4);

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        gbm.match(block3, block1);

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        gbm.match(block4, block2);

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);
    });

    test(`matching does not change the host grid block reference`, () => {
        const block1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);
        
        const block2 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);
        
        gbm.match(block1, block2);
        
        expect(block1.toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);
    });

    test(`sum does not expand host block dimensions`, () => {
        const block1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        const block2 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell({ isTaken: true })]
        ]);

        gbm.match(block1, block2);

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        expect(gbm.isSumExpanding()).toBeTruthy();

        gbm.match(block1, block2, { col: -1, row: 0 });

        expect(gbm.getSum().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        expect(gbm.isSumExpanding()).toBeTruthy();
    });

    test(`matching determines intersection`, () => {
        const block1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        const block2 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell({ isTaken: true }), new GridCell(), new GridCell({ isTaken: true })]
        ]);

        gbm.match(block1, block2);

        expect(gbm.getIntersection().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        gbm.match(block1, block2, { col: -1, row: 0 });

        expect(gbm.getIntersection().toArray()).toEqual([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell(), new GridCell()]
        ]);
    });

    test(`intersection is null if it is an empty set`, () => {
        const block1 = new GridBlock([
            [new GridCell({ isTaken: true }), new GridCell()],
            [new GridCell({ isTaken: true }), new GridCell()]
        ]);

        const block2 = new GridBlock([
            [new GridCell(), new GridCell({ isTaken: true }), new GridCell({ isTaken: true })],
            [new GridCell(), new GridCell(), new GridCell()]
        ]);

        gbm.match(block1, block2);

        expect(gbm.getIntersection()).toBeNull();

        gbm.match(block1, block2, { col: -1, row: 0 });

        expect(gbm.getIntersection()).toBeNull();
    });
});
