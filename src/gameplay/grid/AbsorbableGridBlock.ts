import GridBlock from './GridBlock';

export default class AbsorbableGridBlock extends GridBlock {
    public constructor(params?: any, cells?: Array<any>) {
        super(params, cells);
    }

    public absorb(gridBlock: GridBlock): AbsorbableGridBlock {
        const gridBlockArray = gridBlock.toArray();
        const rowsCount = Math.max(this.cells.length, gridBlockArray.length);
        const colsCount = Math.max(this.cells[0].length, gridBlockArray[0].length);

        let out = new Array(rowsCount);

        for (let i = 0; i < rowsCount; i++) {
            out[i] = new Array(colsCount);

            for (let j = 0; j < colsCount; j++) {
                out[i][j] = this.cells[i][j];

                if (gridBlockArray[i] && gridBlockArray[i][j] && gridBlockArray[i][j].getIsTaken()) {
                    out[i][j] = this.cells[i][j] = gridBlockArray[i][j];
                }
            }
        }

        this.cells = out;

        return this;
    }
}