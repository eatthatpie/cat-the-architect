import GridBlock from './GridBlock';
import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface';
import GridBlockMatcher from '@/gameplay/grid/GridBlockMatcher';
import GridCoordInterface from '@/gameplay/interfaces/GridCoordInterface';
import { Direction } from '@/common/Types';
import CloneableInterface from '@/interfaces/CloneableInterface';

export default class CollidableGridBlockDecorator extends GridBlockDecotator {
    public constructor(gridBlock: GridBlockInterface & CloneableInterface) {
        super(gridBlock);
    }

    public getGridBlock(): GridBlockInterface {
        return this.gridBlock;
    }

    public getCollisionPositionWith(
        gridBlock: GridBlockInterface,
        direction: Direction,
        coords?: GridCoordInterface
    ): GridCoordInterface {
        if (direction !== Direction.DOWN) {
            throw new Error(
                `Method getCollisionPositionWith for given vector
                is not implemented yet.`
            );
        }

        let col = coords ? coords.col : 1;
        let row = coords ? coords.row : 1;

        while(!this.isCollidingWith(gridBlock, { col, row }) && row < 20) {
            row++;
        }

        row--;

        return { col, row };
    }

    public isCollidingWith(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): Boolean {
        const gmb = new GridBlockMatcher();

        gmb.match(<GridBlock> this.gridBlock, gridBlock, coords);

        if (gmb.isSumExpanding()) {
            return true;
        } else {
            return gmb.getIntersection() !== null;
        }
    }
}