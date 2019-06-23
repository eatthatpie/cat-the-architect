import GridBlock from './GridBlock';
import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface';
import GridCoordInterface from '@/gameplay/interfaces/GridCoordInterface';
import { Direction } from '@/common/Types';

export default class CollidableGridBlockDecorator extends GridBlockDecotator implements GridBlockInterface {
    public constructor(gridBlock: GridBlockInterface) {
        super(gridBlock);
    }

    public getCollisionPositionWith(
        gridBlock: GridBlockInterface,
        direction: Direction,
        coords?: GridCoordInterface
    ): GridCoordInterface {
        if (direction !== Direction.DOWN) {
            throw new Error(`Method getCollisionPositionWith for given vector is not implemented yet.`);
        }

        let col = coords ? coords.col : 1;
        let row = coords ? coords.row : 1;

        while(!this.isCollidingWith(gridBlock, { col, row }) && row < 20) {
            row++;
        }

        row--;

        return { col, row };
    }

    public isCollidingWith(gridBlock: GridBlockInterface, coords?: GridCoordInterface): Boolean {
        let gridBlockArray = gridBlock.toArray();

        if (coords) {
            const sourceRows = gridBlockArray.length;
            const sourceCols = gridBlockArray[0].length;
            const targetRows = sourceRows + (coords.row - 1);
            const targetCols = sourceCols + (coords.col - 1);
            let result = [];

            if (this.gridBlock.toArray().length < targetRows || this.gridBlock.toArray()[0].length < targetCols) {
                return true;
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

        for (let i = 0; i < rowsCount; i++) {
            for (let j = 0; j < colsCount; j++) {
                if (gridBlockArray[i] && gridBlockArray[i][j] && this.gridBlock.toArray()[i] && this.gridBlock.toArray()[i][j]) {
                    if (gridBlockArray[i][j].getIsTaken() && this.gridBlock.toArray()[i][j].getIsTaken()) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}