import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface';
import GridCoordInterface from '@/gameplay/interfaces/GridCoordInterface';
import GridBlock from './GridBlock';
import Vector from '@/common/math/Vector';

export default class CollidableGridBlockDecorator implements GridBlockInterface {
    protected gridBlock: GridBlockInterface;

    public constructor(gridBlock: GridBlockInterface) {
        this.gridBlock = gridBlock;
    }

    public getCollisionPositionWith(gridBlock: GridBlockInterface, vector: Vector, coords?: GridCoordInterface): Array<Array<any>> {
        return [[]];
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

    public toArray(): Array<any> {
        return this.gridBlock.toArray();
    }
}