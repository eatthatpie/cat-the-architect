import GridBlock from '@/gameplay/grid/GridBlock';
import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface';
import GridCoordInterface from '@/gameplay/interfaces/GridCoordInterface';

export default class AbsorbableGridBlockDecorator extends GridBlockDecotator implements GridBlockInterface {
    public constructor(gridBlock: GridBlockInterface) {
        super(gridBlock);
    }

    public absorb(gridBlock: GridBlockInterface, coords?: GridCoordInterface): GridBlockInterface {
        let gridBlockArray = gridBlock.toArray();

        if (coords) {
            const sourceRows = gridBlockArray.length;
            const sourceCols = gridBlockArray[0].length;
            const targetRows = sourceRows + (coords.row - 1);
            const targetCols = sourceCols + (coords.col - 1);
            let result = [];

            if (this.gridBlock.toArray().length < targetRows || this.gridBlock.toArray()[0].length < targetCols) {
                throw new Error(`Grid absorption cannot extend absorbable grid block's dimensions.`);
            }

            for (let i = 0; i < targetRows; i++) {
                result[i] = [];

                for (let j = 0; j < targetCols; j++) {
                    const sourceRow = i - coords.row + 1;
                    const sourceCol = j - coords.col + 1;

                    if (sourceRow < 0 || sourceCol < 0) {
                        continue;
                    }

                    result[i][j] = gridBlockArray[sourceRow][sourceCol] || new GridBlock();
                }
            }

            gridBlockArray = result;
        }

        const rowsCount = Math.max(this.gridBlock.toArray().length, gridBlockArray.length);
        const colsCount = Math.max(this.gridBlock.toArray()[0].length, gridBlockArray[0].length);

        // @TODO: refactor this
        // It seems that this method works with references to GridBlock objects.
        // This is silly.
        let out = new Array(rowsCount);

        for (let i = 0; i < rowsCount; i++) {
            out[i] = new Array(colsCount);

            for (let j = 0; j < colsCount; j++) {
                out[i][j] = this.gridBlock.toArray()[i][j];

                if (gridBlockArray[i] && gridBlockArray[i][j] && gridBlockArray[i][j].getIsTaken && gridBlockArray[i][j].getIsTaken()) {
                    out[i][j] = this.gridBlock.toArray()[i][j] = gridBlockArray[i][j];
                }
            }
        }

        return this;
    }
}