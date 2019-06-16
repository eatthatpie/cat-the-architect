import GridCell from './GridCell';

describe(`Grid cell`, () => {
    test(`grid cell can be taken`, () => {
        const gridCell = new GridCell({ isTaken: true });

        expect(gridCell.getIsTaken()).toBe(true);
    });
});